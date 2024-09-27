const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "artemliaschenko@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmai = async (data) => {
  const email = { from: "artemliaschenko@meta.ua", ...data };
  await transport.sendMail(email);
};

module.exports = sendEmai;

// const email = {
//   to: "playfootball826@gmail.com",
//   from: "artemliaschenko@meta.ua",
//   subject: "test email",
//   html: "<p>Test email</p>",
// };
