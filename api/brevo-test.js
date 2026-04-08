import { syncContactToBrevo } from './_lib/brevoService.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Test with the exact same flow as quote form
    const result = await syncContactToBrevo({
      name: 'Quote Test',
      email: 'quote-test-' + Date.now() + '@example.com',
      phone: '',
      company: '',
      service: 'Signage',
      source: 'quote_form',
      optInMarketing: true,
    });
    return res.json({ brevoResult: result });
  }

  // GET: check if the quote endpoint is even being reached
  res.json({ message: 'POST to this endpoint to test Brevo from quote flow' });
}
