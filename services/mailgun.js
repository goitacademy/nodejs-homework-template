const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendVerificationEmail = (email, token) => {
  const data = {
    from: "noreply@yourdomain.com",
    to: email,
    subject: "Email Verification",
    text: `Please verify your email by clicking the link: ${process.env.BASE_URL}/api/users/verify/${token}`,
  };

  return mg.messages().send(data);
};

module.exports = { sendVerificationEmail };
