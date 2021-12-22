const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (mail, token) => {
  const email = {
    to: mail,
    from: "tar86irina@gmail.com",
    subject: "Регистрация в сервисе Contacts",
    html: `<a href="localhost:3001/api/users/verify/${token}>Для подтверждения регистрации перейдите по ссылке</a>`,
  };
  try {
    sgMail.send(email);
    console.log("Email send success");
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
