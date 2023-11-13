const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

const sendEmail = async (options) => {
    try {
        await transporter.sendMail(options);
    } catch (e) {
        console.error(e);
        throw new Error('Mail sending failed!');
    }
};

module.exports = {
    sendEmail,
};