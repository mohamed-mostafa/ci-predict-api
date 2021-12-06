const nodemailer = require("nodemailer");

class ConfirmMailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "realauthor.com",
      port: 465,
      secure: true,
      auth: {
        user: "noreplay@realauthor.com",
        pass: "Realauthor@123",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  sendMail({ to, token }) {
    const url = `https://realauthor.com/auth/verify/${token}`;
    // const url = `https://author.piattaforma.store/auth/verify/${token}`;
    const mailOptions = {
      from: "noreplay@realauthor.com",
      to: to,
      subject: "Email Verification",
      html:
        // eslint-disable-next-line no-template-curly-in-string
        `Hello,<br /><br />Thank you for registering. First, you need to confirm your account. Just click the link below.<br /><br /><a href="${url}">${url}</a><br /><br />Regards,<br />Realauthor`,
    };
    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("message sent ", info);
      }
    });
  }

  sendResetPassword({ to, token, id }) {
    const url = `https://realauthor.com/authentication/reset-password-v2?token=${token}&id=${id}`;
    const mailOptions = {
      from: "noreplay@realauthor.com",
      to: to,
      subject: "Reset password",
      html:
        // eslint-disable-next-line no-template-curly-in-string
        `Hello,<br /><br />click the link below to reset your password.<br /><br /><h2>${url}</h2><br /><br />Regards,<br />Realauthor`,
    };
    this.transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("message sent ", info);
      }
    });
  }
}

module.exports = new ConfirmMailService();
