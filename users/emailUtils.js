import { config } from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';

config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_HOST,
  port: process.env.MAILGUN_PORT,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

export function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: process.env.MAILGUN_USER,
    to: email,
    subject: 'Verification Email',
    text: `Click the following link to verify your email: localhost:3000/users/verify/${verificationToken}`,
  }; //http://yourapi.com/users/verify/${user.verificationToken}`,

  return transporter.sendMail(mailOptions);
}

export function generateUniqueToken() {
  return uuidv4();
}
