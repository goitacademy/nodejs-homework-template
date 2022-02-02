const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

const { SENDGRID_API_KEY, SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

/*
const data = {
  to: 'reciver',
  subject: 'Email verification',
  html: `<p>Please verify your email</p>
        <p>Byclicking on the following link, you are confirming your email address.</p>`,
};
*/

const sendEmail = async data => {
  try {
    const email = { ...data, from: `${SENDER_EMAIL}` };
    await sgMail.send(email);

    return true;
  } catch (err) {
    throw err;
  }
};

module.exports = sendEmail;
