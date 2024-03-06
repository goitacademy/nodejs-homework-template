const mailgun = require('mailgun-js');
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

async function sendVerificationEmail(user) {
  const verificationLink = `http://localhost:3000/users/verify/${user.verificationToken}`;
  const messageData = {
    from: process.env.MAILGUN_EMAIL_FROM,
    to: user.email,
    subject: 'Email verification',
    text: `Please click on this link to verify your email: ${verificationLink}`,
    html: `<strong><a href="${verificationLink}">Click here</a></strong> to verify your email`,
  };
  await mg.messages().send(messageData, (error, body) => {
    if (error) {
      console.error(error);
    }
  });
}

module.exports = sendVerificationEmail;