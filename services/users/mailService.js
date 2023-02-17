const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', 'config', '.env'),
});
const { EMAIL, EMAIL_PASS } = process.env;

const nodeMailerConfig = {
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(
  nodeMailerConfig
);

const sendEmail = async (data) => {
  if (!data.to || !data.html) {
    throw new Error(
      'Invalid email data: to and html are required'
    );
  }

  try {
    const email = { ...data, from: EMAIL };
    const info = await transporter.sendMail(email);
    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Error sending email:', err);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
