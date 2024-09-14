const mailgun = require('mailgun-js');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3000/users/verify/${token}`;

  const data = {
    from: 'no-reply@your-domain.com',
    to: email,
    subject: 'Please verify your email',
    text: `Click on the link to verify your email: ${verificationLink}`,
  };

  await mg.messages().send(data);
};

module.exports = sendVerificationEmail;
