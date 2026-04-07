import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

const ALLOWED_EXTENSIONS = new Set([
  '.pdf', '.ai', '.psd', '.eps', '.svg',
  '.png', '.jpg', '.jpeg', '.tiff', '.tif',
]);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

function fileFilter(_req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ALLOWED_EXTENSIONS.has(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed: ${ext}. Accepted types: ${[...ALLOWED_EXTENSIONS].join(', ')}`));
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB per file
    files: 5,
  },
});

router.post('/', (req, res) => {
  upload.array('files', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      const messages = {
        LIMIT_FILE_SIZE: 'File is too large. Maximum size is 25 MB.',
        LIMIT_FILE_COUNT: 'Too many files. Maximum is 5 files per upload.',
        LIMIT_UNEXPECTED_FILE: 'Unexpected file field.',
      };
      return res.status(400).json({
        success: false,
        error: messages[err.code] || err.message,
      });
    }

    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files were uploaded.' });
    }

    const files = req.files.map((file) => ({
      id: path.basename(file.filename, path.extname(file.filename)),
      name: file.originalname,
      size: file.size,
      path: `/uploads/${file.filename}`,
    }));

    res.json({ success: true, files });
  });
});

export default router;
