// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD, META_USER } = process.env;

// const nodeMailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: META_USER,
//     pass: META_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// };

// const transport = nodemailer.createTransport(nodeMailerConfig);

// const sendEmail = {
//   to: "comibe4076@ubinert.com",
//   from: META_USER,
//   subject: "test email",
//   html: "<p><strong>Test email</strong> from localhost:3000</p>",
// };

// transport
//   .sendMail(sendEmail)
//   .then(() => console.log("Email send succes"))
//   .catch((error) => console.log(error.message));

// module.exports = sendEmail;

/////////////////
const nodemailer = require("nodemailer");

require("dotenv").config();

const { META_PASSWORD, META_USER } = process.env;

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: META_USER,
    pass: META_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (emailOptions) => {
  const email = { ...emailOptions, from: META_USER };
  return transporter.sendMail(email);
};

module.exports = sendEmail;
