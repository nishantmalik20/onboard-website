import { syncContactToBrevo } from './_lib/brevoService.js';

export default async function handler(req, res) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    return res.json({
      error: 'BREVO_API_KEY is not set in environment variables',
      keyExists: false,
    });
  }

  try {
    const result = await syncContactToBrevo({
      name: 'Test User',
      email: 'test-debug@example.com',
      phone: '',
      source: 'debug_test',
      optInMarketing: true,
    });

    res.json({
      keyExists: true,
      keyPrefix: apiKey.substring(0, 10) + '...',
      brevoResult: result,
    });
  } catch (err) {
    res.json({
      keyExists: true,
      keyPrefix: apiKey.substring(0, 10) + '...',
      error: err.message,
    });
  }
}
