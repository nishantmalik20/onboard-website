import { sendContactNotification, sendContactConfirmation } from './_lib/emailService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  // Validation
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Name must be at least 2 characters.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('A valid email address is required.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join(' ') });
  }

  try {
    await sendContactNotification({
      name: name.trim(),
      email: email.trim(),
      phone: phone || '',
      message: message.trim(),
    });
    await sendContactConfirmation(email.trim(), name.trim());

    res.json({ success: true, message: 'Your message has been sent. We will get back to you soon!' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, error: 'Failed to send your message. Please try again later.' });
  }
}
