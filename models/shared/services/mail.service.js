//models/shared/services/mail.service.js
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

const config = {
    host: "smtp.mailgun.org",
    port: 587,
    auth: {
      user: 'postmaster@sandboxda33cce3c6f64200805e0f36879030b7.mailgun.org',
      pass: process.env.MLG_PASSWORD,
    }
  }
  
  const transporter = nodemailer.createTransport(config);

  export default transporter;