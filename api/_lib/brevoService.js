const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

/**
 * Add or update a contact in Brevo.
 * If optInMarketing is false, contact is added to a "No Marketing" list.
 * If true, contact is added to the "Marketing" list.
 */
export async function syncContactToBrevo({ name, email, phone, company, service, source, optInMarketing }) {
  if (!BREVO_API_KEY) {
    console.warn('[Brevo] API key not configured — skipping contact sync.');
    return null;
  }

  const [firstName, ...rest] = (name || '').trim().split(' ');
  const lastName = rest.join(' ') || '';

  const payload = {
    email: email.trim().toLowerCase(),
    attributes: {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      SMS: phone || '',
      COMPANY: company || '',
      SERVICE_INTEREST: service || '',
      SOURCE: source || 'website',
      OPT_IN_MARKETING: optInMarketing ? 'true' : 'false',
    },
    listIds: optInMarketing ? [3] : [4],
    updateEnabled: true,
  };

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('[Brevo] Failed to sync contact:', error);
      return null;
    }

    console.log(`[Brevo] Contact synced: ${email} (marketing: ${optInMarketing})`);
    return await res.json();
  } catch (err) {
    console.error('[Brevo] Error syncing contact:', err.message);
    return null;
  }
}
