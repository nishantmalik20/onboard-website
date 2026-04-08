import { sendQuoteNotification, sendContactConfirmation } from './_lib/emailService.js';
import { syncContactToBrevo } from './_lib/brevoService.js';

export const config = {
  api: { bodyParser: false },
};

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const contentType = req.headers['content-type'] || '';
      const boundaryMatch = contentType.match(/boundary=(.+)/);
      if (!boundaryMatch) return reject(new Error('No boundary found'));

      const boundary = boundaryMatch[1];
      const parts = buffer.toString().split(`--${boundary}`).slice(1, -1);
      const fields = {};
      const files = [];

      for (const part of parts) {
        const [rawHeaders, ...bodyParts] = part.split('\r\n\r\n');
        const body = bodyParts.join('\r\n\r\n').replace(/\r\n$/, '');
        const nameMatch = rawHeaders.match(/name="([^"]+)"/);
        const filenameMatch = rawHeaders.match(/filename="([^"]+)"/);

        if (!nameMatch) continue;

        if (filenameMatch && filenameMatch[1]) {
          files.push({
            name: filenameMatch[1],
            size: Buffer.byteLength(body),
            buffer: Buffer.from(body, 'binary'),
          });
        } else {
          fields[nameMatch[1]] = body;
        }
      }

      resolve({ fields, files });
    });
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let fields, files;
  try {
    const parsed = await parseMultipart(req);
    fields = parsed.fields;
    files = parsed.files;
  } catch (err) {
    return res.status(400).json({ success: false, error: 'Failed to parse form data.' });
  }

  const { name, email, phone, company, service, description, quantity, deadline, budget, optInMarketing } = fields;

  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email address is required.');
  if (!service) errors.push('Please select a service.');
  if (!description || description.trim().length < 20) errors.push('Description must be at least 20 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(' ') });
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
    });
    await sendContactConfirmation(email.trim(), name.trim());

    // Sync to Brevo
    try {
      await syncContactToBrevo({
        name: name.trim(),
        email: email.trim(),
        phone: phone || '',
        company: company || '',
        service,
        source: 'quote_form',
        optInMarketing: optInMarketing !== 'false',
      });
    } catch (brevoErr) {
      console.error('[Brevo] Sync error (non-fatal):', brevoErr);
    }

    res.json({ success: true, message: 'Your quote request has been submitted. We will be in touch shortly!' });
  } catch (err) {
    console.error('Quote form error:', err);
    res.status(500).json({ success: false, error: 'Failed to submit your quote request. Please try again later.' });
  }
}
