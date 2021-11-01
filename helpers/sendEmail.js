// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();
// const { SENDGRID_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_KEY);

// const email = {
//   to: "solivijasosna@gmail.com",
//   from: "sosnaolgaandreevna@gmail.com",
//   subject: "Новая заявка с сайта",
//   html: `<p>Пришел заказ с сайта</p>`,
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email success send"))
//   .catch((error) => console.log(error.message));


const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "sosnaolgaandreevna@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
