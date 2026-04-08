const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.json({ success: false, error: 'BREVO_API_KEY not set' });
  }

  const { name, email, phone, optInMarketing } = req.body;

  if (!email) {
    return res.json({ success: false, error: 'Email is required' });
  }

  const [firstName, ...rest] = (name || '').trim().split(' ');
  const lastName = rest.join(' ') || '';

  const payload = {
    email: email.trim().toLowerCase(),
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
    },
    listIds: optInMarketing ? [3] : [4],
    updateEnabled: true,
  };

  if (phone) payload.attributes.SMS = phone;

  try {
    const brevoRes = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await brevoRes.text();

    res.json({
      success: brevoRes.ok,
      status: brevoRes.status,
      payload,
      brevoResponse: responseText,
    });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
}
