import nodemailer from "nodemailer";
import config from "../../config/index.js";

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.port === 465, // true for 465, false for 587
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
  }
  return transporter;
};

export const sendOTPEmail = async (toEmail, otpCode) => {
  if (!config.email.user || !config.email.pass) {
    console.warn("⚠️ SMTP credentials not set. Falling back to console OTP:", otpCode);
    return { success: true, simulated: true };
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Newsreader', Georgia, serif; background-color: #faf8f5; color: #141414; margin: 0; padding: 40px 20px; }
        .container { max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #141414; padding: 36px 32px; box-shadow: 4px 4px 0px #141414; }
        .header { border-bottom: 2px solid #141414; padding-bottom: 16px; margin-bottom: 24px; }
        .kicker { font-family: monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #b91c1c; font-weight: bold; }
        .masthead { font-size: 26px; font-weight: normal; margin: 8px 0 0 0; }
        .otp-box { background: #faf8f5; border: 1px dashed #141414; text-align: center; padding: 24px; margin: 28px 0; }
        .otp-code { font-family: monospace; font-size: 36px; font-weight: bold; letter-spacing: 0.25em; color: #141414; }
        .footer { font-family: monospace; font-size: 11px; color: #737373; border-top: 1px solid #e8e4dc; padding-top: 16px; margin-top: 28px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="kicker">AUTHOR ACCREDITATION DESK • SECURE ENTRY</div>
          <h1 class="masthead">MixHub Dispatch Bureau</h1>
        </div>
        <p style="font-size: 16px; line-height: 1.6;">
          An author verification request was initiated for your editorial account. Please use the singular access code below to complete your authentication:
        </p>
        <div class="otp-box">
          <div style="font-family: monospace; font-size: 11px; text-transform: uppercase; color: #737373; margin-bottom: 8px;">Single-Use Verification Code</div>
          <div class="otp-code">${otpCode}</div>
          <div style="font-family: monospace; font-size: 11px; color: #b91c1c; margin-top: 8px;">Expires in 5 minutes</div>
        </div>
        <p style="font-size: 13px; color: #5e5a54; font-style: italic;">
          If you did not request this accreditation code, no action is required; this dispatch will expire automatically.
        </p>
        <div class="footer">
          MixHub Press • Handcrafted Broadside & Teleprinter Archive • 2026 Edition
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transport = getTransporter();
    const info = await transport.sendMail({
      from: `"MixHub Press" <${config.email.user}>`,
      to: toEmail,
      subject: `[${otpCode}] Your MixHub Author Verification Code`,
      html: htmlContent,
    });
    console.log("📨 OTP Email dispatched:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ SMTP Delivery Error:", error);
    throw error;
  }
};

