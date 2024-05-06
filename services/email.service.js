const mailgun = require('mailgun-js');
const DOMAIN = 'sandboxd3a08a7b3ce34373b3ec6610b2e933c5.mailgun.org'
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});



const sendVerificationEmail = (email, verificationToken) => {
  const data = {
    from: 'Excited User <mailgun@your-sandbox-domain.mailgun.org>',
    to: email,
    subject: 'Verify Your Email',
    text: `Please verify your email by clicking the following link: ${process.env.FRONTEND_URL}/verify/${verificationToken}`
  };

  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
};
  
module.exports = {sendVerificationEmail};