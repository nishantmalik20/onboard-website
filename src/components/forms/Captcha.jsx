import { forwardRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

// True only once a site key is configured. Lets the forms require a captcha
// when it's set up, and behave normally (no widget) before keys exist.
export const captchaEnabled = !!SITE_KEY;

/**
 * hCaptcha widget. Renders nothing until VITE_HCAPTCHA_SITE_KEY is set, so the
 * forms keep working before keys are wired. Forward the ref to call
 * `.resetCaptcha()` after a submit.
 */
export const Captcha = forwardRef(function Captcha({ onVerify, onExpire }, ref) {
  if (!SITE_KEY) return null;
  return (
    <div className="mt-1">
      <HCaptcha
        ref={ref}
        sitekey={SITE_KEY}
        theme="dark"
        onVerify={onVerify}
        onExpire={onExpire}
        onError={onExpire}
      />
    </div>
  );
});
