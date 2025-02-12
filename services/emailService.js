const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: 'kapiw2002@gmail.com', // Twój zweryfikowany e-mail
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: http://localhost:3001/users/verify/${verificationToken}`,
    html: `<strong>Please verify your email by clicking the following link:</strong> <a href="http://localhost:3001/users/verify/${verificationToken}">Verify Email</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

module.exports = sendVerificationEmail;
