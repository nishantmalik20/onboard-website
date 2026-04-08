import { syncContactToBrevo } from './_lib/brevoService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, service, source, optInMarketing } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required.' });
  }

  try {
    await syncContactToBrevo({
      name: name || '',
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      source: source || 'website',
      optInMarketing: optInMarketing !== false,
    });
    res.json({ success: true });
  } catch (err) {
    console.error('[Brevo] Sync error:', err);
    res.json({ success: false });
  }
}
