import nodemailer from 'nodemailer';
import 'dotenv/config';

// ============================================================

const { UKR_NET_PASSWORD, UKR_NET_FROM } = process.env;

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 2525,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = data => {
  const email = { ...data, from: UKR_NET_FROM };
  return transport.sendMail(email);
};

export default sendEmail;
