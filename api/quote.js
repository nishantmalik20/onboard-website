import multer from 'multer';
import path from 'path';
import { sendQuoteNotification, sendContactConfirmation } from './_lib/emailService.js';
import { syncContactToBrevo } from './_lib/brevoService.js';

export const config = {
  api: { bodyParser: false },
};

const ALLOWED_EXTENSIONS = new Set([
  '.pdf', '.ai', '.psd', '.eps', '.svg',
  '.png', '.jpg', '.jpeg', '.tiff', '.tif',
]);

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ALLOWED_EXTENSIONS.has(ext)) cb(null, true);
    else cb(new Error(`File type not allowed: ${ext}`));
  },
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await runMiddleware(req, res, upload.array('files', 5));
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }

  const { name, email, phone, company, service, description, quantity, deadline, budget, optInMarketing } = req.body;

  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email address is required.');
  if (!service) errors.push('Please select a service.');
  if (!description || description.trim().length < 20) errors.push('Description must be at least 20 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(' ') });
  }

  try {
    const files = (req.files || []).map((f) => ({
      name: f.originalname,
      size: f.size,
      buffer: f.buffer,
    }));

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

    // Sync to Brevo (await so Vercel doesn't kill the function before it completes)
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
