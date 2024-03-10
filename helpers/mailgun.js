const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

const sendVerificationEmail = async (user) => {
  const verificationToken = user.verificationToken;

  const msg = {
    to: user.email,
    from: process.env.MAILGUN_EMAIL_FROM,
    subject: 'Verify your email',
    text: `Hello ${user.name},\n\nPlease verify your email by clicking on the following link: ${process.env.APP_URL}/api/auth/verify/${verificationToken}`,
  };

  try {
    const result = await mailgun.messages().send(msg);
    console.log('Email sent:', result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendVerificationEmail };