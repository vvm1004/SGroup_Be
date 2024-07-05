import crypto from 'crypto';
import nodemailer from 'nodemailer';

class MailService {
  async sendResetEmail(email, resetLink) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });


    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click this link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
  }
}

export default new MailService();
