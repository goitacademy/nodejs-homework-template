const { META_PASSWORD } = process.env;

const nodemailer = require("nodemailer");

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "karenihor@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

function emailSender({ email, authKey }) {
  const newMessage = {
    from: "karenihor@meta.ua",
    to: email,
    subject: "Verefication",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${authKey}">Click to confirm your email</a>`,
  };

  transport
    .sendMail(newMessage)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));
}

module.exports = emailSender;
