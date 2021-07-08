const Mailgen = require('mailgen');
const createTemplate = (verifyToken, name) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'My homework',
      link: 'http://localhost:3000/',
    },
  });
  const template = {
    body: {
      name,
      intro:
        "Welcome to Contacts book! We're very excited to have you on board.",
      action: {
        instructions: 'To get started with Contacts book, please click here:',
        button: {
          color: '#22BC66',
          text: 'Confirm your account',
          link: `http://localhost:3000/verify/${verifyToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGenerator.generate(template);
  return emailBody;
};

const message = (email, verifyToken, name) => {
  const emailBody = createTemplate(verifyToken, name);
  const sendMessage = {
    from: process.env.EMAIL_NAME,
    to: email, // list of receivers
    subject: 'Verification token', // Subject line
    html: emailBody,
  };
  return sendMessage;
};

module.exports = message;
