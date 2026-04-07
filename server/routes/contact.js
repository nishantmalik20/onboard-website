import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.js';
import { sendContactNotification, sendContactConfirmation } from '../services/emailService.js';

const router = Router();

const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('A valid email address is required.'),
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 30 })
    .withMessage('Phone number must be 30 characters or fewer.'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters.'),
];

router.post('/', contactValidation, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const contactData = { name, email, phone, message };

    await sendContactNotification(contactData);
    await sendContactConfirmation(email, name);

    res.json({
      success: true,
      message: 'Your message has been sent. We will get back to you soon!',
    });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send your message. Please try again later.',
    });
  }
});

export default router;
