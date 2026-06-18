/**
 * Verify an hCaptcha token server-side.
 *
 * - No HCAPTCHA_SECRET configured  -> returns true (feature off; forms work).
 * - Missing/invalid token          -> returns false (reject the submission).
 * - hCaptcha API unreachable        -> returns true (fail open, so an hCaptcha
 *   outage never blocks a real customer from reaching the business).
 */
export async function verifyCaptcha(token) {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true;
  if (!token) return false;

  try {
    const res = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: String(token) }),
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error('[captcha] verification request failed, allowing submission:', err.message);
    return true;
  }
}
