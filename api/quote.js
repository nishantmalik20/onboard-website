import { sendQuoteNotification, sendContactConfirmation } from './_lib/emailService.js';
import { persistQuoteSubmission, persistQuoteSubmissionFromPaths } from './_lib/quoteStorage.js';
import { verifyCaptcha } from './_lib/verifyCaptcha.js';

export const config = {
  api: { bodyParser: false },
};

const DOUBLE_CRLF = Buffer.from('\r\n\r\n');

/**
 * Binary-safe multipart/form-data parser.
 *
 * The body must be parsed as raw bytes. Decoding the whole buffer with
 * buffer.toString() (UTF-8) mangles any binary file — images, PDFs — into
 * U+FFFD replacement characters, which is what was corrupting every uploaded
 * attachment. Here we slice each file's bytes straight out of the Buffer and
 * only decode the small header/field text as UTF-8.
 */
export function parseMultipartBuffer(buffer, contentType) {
  const boundaryMatch = (contentType || '').match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!boundaryMatch) throw new Error('No boundary found');
  const boundary = (boundaryMatch[1] || boundaryMatch[2]).trim();
  const delimiter = Buffer.from(`--${boundary}`);

  const fields = {};
  const files = [];

  // Locate every boundary delimiter in the raw bytes.
  const marks = [];
  let at = buffer.indexOf(delimiter, 0);
  while (at !== -1) {
    marks.push(at);
    at = buffer.indexOf(delimiter, at + delimiter.length);
  }

  // Each part lives between two consecutive delimiters; the final delimiter is
  // the closing "--boundary--", so we stop one short.
  for (let i = 0; i < marks.length - 1; i++) {
    let part = buffer.subarray(marks[i] + delimiter.length, marks[i + 1]);

    // Trim the CRLF after the delimiter line and the CRLF before the next one.
    if (part[0] === 0x0d && part[1] === 0x0a) part = part.subarray(2);
    if (part[part.length - 2] === 0x0d && part[part.length - 1] === 0x0a) {
      part = part.subarray(0, part.length - 2);
    }

    const headerEnd = part.indexOf(DOUBLE_CRLF);
    if (headerEnd === -1) continue;

    const headers = part.subarray(0, headerEnd).toString('utf8');
    const body = part.subarray(headerEnd + DOUBLE_CRLF.length);

    const nameMatch = headers.match(/name="([^"]+)"/i);
    if (!nameMatch) continue;
    const filenameMatch = headers.match(/filename="([^"]*)"/i);

    if (filenameMatch && filenameMatch[1]) {
      const typeMatch = headers.match(/content-type:\s*([^\r\n]+)/i);
      files.push({
        name: filenameMatch[1],
        contentType: typeMatch ? typeMatch[1].trim() : 'application/octet-stream',
        size: body.length,
        buffer: Buffer.from(body), // own copy of the exact bytes
      });
    } else {
      fields[nameMatch[1]] = body.toString('utf8');
    }
  }

  return { fields, files };
}

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        resolve(parseMultipartBuffer(Buffer.concat(chunks), req.headers['content-type']));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentType = req.headers['content-type'] || '';
  let fields = {};
  let files = [];
  let uploadedFiles = null; // null → multipart flow; array → direct-upload flow

  if (contentType.includes('application/json')) {
    // Preferred flow: files already uploaded to Storage; body is small JSON.
    let body;
    try {
      body = JSON.parse((await readRawBody(req)).toString('utf8') || '{}');
    } catch {
      return res.status(400).json({ success: false, error: 'Invalid request format.' });
    }
    fields = body;
    uploadedFiles = Array.isArray(body.uploadedFiles) ? body.uploadedFiles : [];
  } else {
    // Fallback: multipart upload through the function (≤ ~4.5 MB).
    try {
      const parsed = await parseMultipart(req);
      fields = parsed.fields;
      files = parsed.files;
    } catch {
      return res.status(400).json({ success: false, error: 'Failed to parse form data.' });
    }
  }

  const { name, email, phone, company, service, description, quantity, deadline, budget } = fields;

  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email address is required.');
  if (!service) errors.push('Please select a service.');
  if (!description || description.trim().length < 20) errors.push('Description must be at least 20 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(' ') });
  }

  if (!(await verifyCaptcha(fields.hcaptchaToken))) {
    return res.status(400).json({ success: false, error: 'Captcha verification failed. Please try again.' });
  }

  // Save the lead + files to Supabase (creates an Opportunity task, records
  // attachments, returns signed links). The direct-upload flow has its files
  // already in Storage; the multipart fallback uploads the buffers here.
  let attachmentLinks = null;
  try {
    const result = uploadedFiles !== null
      ? await persistQuoteSubmissionFromPaths(fields, uploadedFiles)
      : await persistQuoteSubmission(fields, files);
    attachmentLinks = result.links;
  } catch (err) {
    console.error('[quote] Supabase persistence failed:', err.message);
    // Multipart fallback can still email raw attachments; the JSON path can't.
  }

  try {
    await sendQuoteNotification({
      name: name.trim(),
      email: email.trim(),
      phone: phone || '',
      company: company || '',
      serviceType: service,
      description: description.trim(),
      quantity: quantity || '',
      deadline: deadline || '',
      budget: budget || '',
      files,
      attachmentLinks,
    });
    await sendContactConfirmation(email.trim(), name.trim());

    res.json({ success: true, message: 'Your quote request has been submitted. We will be in touch shortly!' });
  } catch (err) {
    console.error('Quote form error:', err);
    res.status(500).json({ success: false, error: 'Failed to submit your quote request. Please try again later.' });
  }
}
