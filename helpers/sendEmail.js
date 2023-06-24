const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smpt.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "mostovama@meta.ua",
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "mostovama@meta.ua" };
    await transport.sendMail(email);
    return true;
  } catch (error) {
console.log(error)  }
};

// const email = {
//     to: "mmainfo15@gmail.com",
//     from: "mostovama@meta.ua",
//     subject: "Test",
//     html: <p>Test email</p>
// }


module.exports = sendEmail;
