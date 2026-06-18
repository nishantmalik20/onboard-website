import nodemailer from 'nodemailer';

let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[EmailService] SMTP not configured — emails will be logged to console.');
    return null;
  }

  _transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
    tls: { rejectUnauthorized: false },
  });

  return _transporter;
}

const getNotificationEmail = () => process.env.NOTIFICATION_EMAIL || 'contact@onboardprints.ca';
const getFromAddress = () => process.env.SMTP_USER || 'contact@onboardprints.ca';

// Escape customer-supplied text before embedding it in notification email HTML,
// so a malicious submission can't inject markup/phishing links into staff mail.
function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function send(mailOptions) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('[EmailService] Would send email:', JSON.stringify(mailOptions, null, 2));
    return { messageId: 'dev-mode' };
  }
  return transporter.sendMail(mailOptions);
}

export async function sendContactNotification({ name, email, phone, message }) {
  return send({
    from: `"OnBoard Website" <${getFromAddress()}>`,
    to: getNotificationEmail(),
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${esc(name)}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${esc(phone) || 'Not provided'}</td></tr>
      </table>
      <h3>Message</h3>
      <p>${esc(message).replace(/\n/g, '<br>')}</p>
    `,
  });
}

export async function sendQuoteNotification(quoteData) {
  const { name, email, phone, company, serviceType, description, quantity, deadline, budget, files, attachmentLinks } = quoteData;

  // Preferred path: files live in Supabase Storage and we email signed links.
  // Fallback path (storage unavailable): attach the raw file buffers as before.
  const linksMode = Array.isArray(attachmentLinks);

  const sizeKb = (bytes) => (bytes ? ` (${(bytes / 1024).toFixed(1)} KB)` : '');

  let fileHtml;
  let fileText = '';
  if (linksMode) {
    fileHtml = attachmentLinks.length > 0
      ? `<h3>Uploaded Files</h3><ul>${attachmentLinks.map((f) => `<li><a href="${f.url}">${esc(f.name)}</a>${sizeKb(f.size)}</li>`).join('')}</ul>`
        + '<p style="font-size:12px;color:#888;">Links expire in 7 days — the files are stored permanently and viewable in the admin panel.</p>'
      : '<p><em>No files uploaded.</em></p>';
    fileText = attachmentLinks.length > 0
      ? `\n\nUploaded Files:\n${attachmentLinks.map((f) => `- ${f.name}: ${f.url}`).join('\n')}`
      : '';
  } else {
    fileHtml = (files && files.length > 0)
      ? `<h3>Uploaded Files</h3><ul>${files.map((f) => `<li>${esc(f.name)}${sizeKb(f.size)}</li>`).join('')}</ul>`
      : '<p><em>No files uploaded.</em></p>';
  }

  const attachments = (!linksMode && files && files.length > 0)
    ? files.map((f) => ({ filename: f.name, content: f.buffer }))
    : [];

  return send({
    from: `"OnBoard Website" <${getFromAddress()}>`,
    to: getNotificationEmail(),
    subject: `New Quote Request — ${serviceType} — from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nCompany: ${company || 'Not provided'}\nService: ${serviceType}\nQuantity: ${quantity || 'Not specified'}\nDeadline: ${deadline || 'Not specified'}\nBudget: ${budget || 'Not specified'}\n\nDescription:\n${description}${fileText}`,
    html: `
      <h2>New Quote Request</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${esc(name)}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${esc(phone) || 'Not provided'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Company</td><td style="padding:4px 12px;">${esc(company) || 'Not provided'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Service</td><td style="padding:4px 12px;">${esc(serviceType)}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Quantity</td><td style="padding:4px 12px;">${esc(quantity) || 'Not specified'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Deadline</td><td style="padding:4px 12px;">${esc(deadline) || 'Not specified'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Budget</td><td style="padding:4px 12px;">${esc(budget) || 'Not specified'}</td></tr>
      </table>
      <h3>Description</h3>
      <p>${esc(description).replace(/\n/g, '<br>')}</p>
      ${fileHtml}
    `,
    attachments,
  });
}

export async function sendContactConfirmation(email, name) {
  return send({
    from: `"OnBoard Print & Signs" <${getFromAddress()}>`,
    to: email,
    subject: 'We received your message — OnBoard Print & Signs',
    text: `Hi ${name},\n\nThank you for reaching out to OnBoard Print & Signs!\nWe have received your message and will get back to you within 1-2 business days.\n\nIf your request is urgent, feel free to call us directly.\n\nBest regards,\nOnBoard Print & Signs Team`,
    html: `
      <p>Hi ${esc(name)},</p>
      <p>Thank you for reaching out to <strong>OnBoard Print &amp; Signs</strong>!</p>
      <p>We have received your message and will get back to you within 1–2 business days.</p>
      <p>If your request is urgent, feel free to call us directly.</p>
      <br>
      <p>Best regards,<br><strong>OnBoard Print &amp; Signs Team</strong></p>
    `,
  });
}
