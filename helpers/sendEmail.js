const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "vadimkorobets@meta.ua",
    pass: META_PASSWORD,
  },
};

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  transporter.sendMail(data, (error, info) => {
    if (error) {
      console.log(error.message);
      return process.exit(1);
    }
    console.log("Email sent success", info.response);
    return process.exit(1);
  });
};

module.exports = sendEmail;

// const email = {
//   from: "vadimkorobets@meta.ua",
//   to: "_s_e_t__@ukr.net",
//   subject: "Test email",
//   text: "Привет. Мы тестируем отправку писем!",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
