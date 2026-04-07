import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { sendQuoteNotification, sendContactConfirmation } from '../services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

/* ── File upload config ── */
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

const ALLOWED_EXTENSIONS = new Set([
  '.pdf', '.ai', '.psd', '.eps', '.svg',
  '.png', '.jpg', '.jpeg', '.tiff', '.tif',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuidv4()}${ext}`);
  },
});

function fileFilter(_req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.has(ext)) cb(null, true);
  else cb(new Error(`File type not allowed: ${ext}`));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024, files: 5 },
});

/* ── Route handler ── */
router.post('/', (req, res) => {
  upload.array('files', 5)(req, res, async (err) => {
    // Handle multer errors
    if (err instanceof multer.MulterError) {
      const messages = {
        LIMIT_FILE_SIZE: 'File is too large. Maximum size is 25 MB.',
        LIMIT_FILE_COUNT: 'Too many files. Maximum is 5 files per upload.',
        LIMIT_UNEXPECTED_FILE: 'Unexpected file field.',
      };
      return res.status(400).json({ success: false, error: messages[err.code] || err.message });
    }
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    try {
      const { name, email, phone, company, service, description, quantity, deadline, budget } = req.body;

      // Basic validation
      const errors = [];
      if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email address is required.');
      if (!service) errors.push('Please select a service.');
      if (!description || description.trim().length < 20) errors.push('Description must be at least 20 characters.');

      if (errors.length > 0) {
        return res.status(400).json({ success: false, error: errors.join(' ') });
      }

      // Build uploaded file info
      const uploadedFiles = (req.files || []).map((file) => ({
        name: file.originalname,
        size: file.size,
        path: `/uploads/${file.filename}`,
        serverPath: file.path,
      }));

      const quoteData = {
        name: name.trim(),
        email: email.trim(),
        phone: phone || '',
        company: company || '',
        serviceType: service,
        description: description.trim(),
        quantity: quantity || '',
        deadline: deadline || '',
        budget: budget || '',
        files: uploadedFiles,
      };

      await sendQuoteNotification(quoteData);
      await sendContactConfirmation(email.trim(), name.trim());

      res.json({
        success: true,
        message: 'Your quote request has been submitted. We will be in touch shortly!',
      });
    } catch (error) {
      console.error('Quote form error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit your quote request. Please try again later.',
      });
    }
  });
});

export default router;
