const BREVO_API_URL = 'https://api.brevo.com/v3/contacts';

/**
 * Add or update a contact in Brevo.
 * If optInMarketing is false, contact is added to "No Marketing" list.
 * If true, contact is added to the "Marketing" list.
 */
export async function syncContactToBrevo({ name, email, phone, company, service, source, optInMarketing }) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
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
    },
    listIds: optInMarketing ? [3] : [4],
    updateEnabled: true,
  };

  // Only add SMS if phone provided (Brevo expects E.164 format or empty)
  if (phone) payload.attributes.SMS = phone;

  try {
    const res = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();

    if (!res.ok) {
      console.error(`[Brevo] Failed to sync contact (${res.status}):`, responseText);
      return null;
    }

    console.log(`[Brevo] Contact synced: ${email} (marketing: ${optInMarketing})`);
    return responseText ? JSON.parse(responseText) : { success: true };
  } catch (err) {
    console.error('[Brevo] Error syncing contact:', err.message);
    return null;
  }
}
