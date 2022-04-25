const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

// Setting up SendGrid's API KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Setting up Mailgen e-mail template generator
const mailGenerator = new Mailgen({
  theme: "neopolitan",
  product: {
    name: process.env.SENDGRID_SENDER_NAME,
    link: `http://localhost:${process.env.PORT || 3000}`, // while in dev, local host link is used
  },
});

// Function to generate message with Mailgen's help
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

// Function to send email with SendGrid's service and with email generated with Mailgen
const sendVerificationEmail = async (name, toEmail, verificationToken) => {
  const message = createMessage(name, toEmail, verificationToken);

  return await sgMail.send(message);
};

module.exports = sendVerificationEmail;