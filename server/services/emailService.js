import nodemailer from 'nodemailer';

/**
 * Returns a nodemailer transporter if SMTP credentials are configured,
 * or null when running in development without SMTP.
 */
let _transporter = null;
let _isDevMode = false;

function getTransporter() {
  if (_transporter) return _transporter;
  if (_isDevMode) return null;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[EmailService] SMTP not configured — emails will be logged to console.');
    _isDevMode = true;
    return null;
  }

  _transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    tls: { rejectUnauthorized: false },
  });
  
  return _transporter;
}

const getNotificationEmail = () => process.env.NOTIFICATION_EMAIL || 'contact@onboardprints.ca';
const getFromAddress = () => process.env.SMTP_USER || 'contact@onboardprints.ca';

/**
 * Send an email, or log it to the console if SMTP is not configured.
 */
async function send(mailOptions) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log('[EmailService] Would send email:');
    console.log(JSON.stringify(mailOptions, null, 2));
    return { messageId: 'dev-mode', logged: true };
  }
  return transporter.sendMail(mailOptions);
}

/**
 * Notify the business owner about a new contact form submission.
 */
export async function sendContactNotification(contactData) {
  const { name, email, phone, message } = contactData;

  const mailOptions = {
    from: `"OnBoard Website" <${getFromAddress()}>`,
    to: getNotificationEmail(),
    subject: `New Contact Form Submission from ${name}`,
    text: [
      'New contact form submission received:',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || 'Not provided'}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${name}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${phone || 'Not provided'}</td></tr>
      </table>
      <h3>Message</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  };

  return send(mailOptions);
}

/**
 * Notify the business owner about a new quote request.
 */
export async function sendQuoteNotification(quoteData) {
  const { name, email, phone, company, serviceType, description, quantity, deadline, budget, files } = quoteData;

  const fileLines = (files && files.length > 0)
    ? ['', 'Uploaded Files:', ...files.map((f) => `  - ${f.name} (${(f.size / 1024).toFixed(1)} KB)`)]
    : ['', 'No files uploaded.'];

  const fileHtml = (files && files.length > 0)
    ? `<h3>Uploaded Files</h3><ul>${files.map((f) => `<li>${f.name} (${(f.size / 1024).toFixed(1)} KB)</li>`).join('')}</ul>`
    : '<p><em>No files uploaded.</em></p>';

  // Build nodemailer attachments from uploaded files
  const attachments = (files && files.length > 0)
    ? files.map((f) => ({ filename: f.name, path: f.serverPath }))
    : [];

  const mailOptions = {
    from: `"OnBoard Website" <${getFromAddress()}>`,
    to: getNotificationEmail(),
    subject: `New Quote Request — ${serviceType} — from ${name}`,
    text: [
      'New quote request received:',
      '',
      `Name:         ${name}`,
      `Email:        ${email}`,
      `Phone:        ${phone || 'Not provided'}`,
      `Company:      ${company || 'Not provided'}`,
      `Service Type: ${serviceType}`,
      `Quantity:     ${quantity || 'Not specified'}`,
      `Deadline:     ${deadline || 'Not specified'}`,
      `Budget:       ${budget || 'Not specified'}`,
      '',
      'Description:',
      description,
      ...fileLines,
    ].join('\n'),
    html: `
      <h2>New Quote Request</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:4px 12px;font-weight:bold;">Name</td><td style="padding:4px 12px;">${name}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Email</td><td style="padding:4px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Phone</td><td style="padding:4px 12px;">${phone || 'Not provided'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Company</td><td style="padding:4px 12px;">${company || 'Not provided'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Service Type</td><td style="padding:4px 12px;">${serviceType}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Quantity</td><td style="padding:4px 12px;">${quantity || 'Not specified'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Deadline</td><td style="padding:4px 12px;">${deadline || 'Not specified'}</td></tr>
        <tr><td style="padding:4px 12px;font-weight:bold;">Budget</td><td style="padding:4px 12px;">${budget || 'Not specified'}</td></tr>
      </table>
      <h3>Description</h3>
      <p>${description.replace(/\n/g, '<br>')}</p>
      ${fileHtml}
    `,
    attachments,
  };

  return send(mailOptions);
}

/**
 * Send an auto-reply confirmation to the customer who submitted a contact form.
 */
export async function sendContactConfirmation(email, name) {
  const mailOptions = {
    from: `"OnBoard Print & Signs" <${getFromAddress()}>`,
    to: email,
    subject: 'We received your message — OnBoard Print & Signs',
    text: [
      `Hi ${name},`,
      '',
      'Thank you for reaching out to OnBoard Print & Signs!',
      'We have received your message and will get back to you within 1-2 business days.',
      '',
      'If your request is urgent, feel free to call us directly.',
      '',
      'Best regards,',
      'OnBoard Print & Signs Team',
    ].join('\n'),
    html: `
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to <strong>OnBoard Print &amp; Signs</strong>!</p>
      <p>We have received your message and will get back to you within 1–2 business days.</p>
      <p>If your request is urgent, feel free to call us directly.</p>
      <br>
      <p>Best regards,<br><strong>OnBoard Print &amp; Signs Team</strong></p>
    `,
  };

  return send(mailOptions);
}
