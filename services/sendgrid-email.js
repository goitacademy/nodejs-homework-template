const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: process.env.SENDGRID_SENDER_NAME,
    link: `http://localhost:${process.env.PORT || 3000}`,
  },
});

const createMessage = (name, toEmail, verificationToken) => {
  const email = {
    body: {
      name: name,
      intro: `Welcome to ${process.env.SENDGRID_SENDER_NAME}! We're very excited to have you on board.`,
      action: {
        instructions: `To get started with ${process.env.SENDGRID_SENDER_NAME}, please click here:`,
        button: {
          color: "#414141",
          text: "Verify your account",
          link: `http://localhost:${
            process.env.PORT || 3000
          }/api/users/verify/${verificationToken}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  const emailBody = mailGenerator.generate(email);

  return {
    to: toEmail,
    from: `${process.env.SENDGRID_SENDER_NAME} <${process.env.SENDGRID_SENDER_EMAIL}>`,
    subject: `Verify your account with ${process.env.SENDGRID_SENDER_NAME}`,
    html: emailBody,
  };
};

const sendVerificationEmail = async (name, toEmail, verificationToken) => {
  const message = createMessage(name, toEmail, verificationToken);

  return await sgMail.send(message);
};

module.exports = sendVerificationEmail;