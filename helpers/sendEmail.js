const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//     to: "teisevilnius@gmail.com",
//     from: "jaroslava.moroziuk@gmail.com",
//     subject: "New request",
//     html: "<p> You received a new request</p>"
// };

// sgMail.send(email)
// .then(()=> console.log("Email send success"))
// .catch(error => console.log(error.message))

const sendEmail = async (data) => {
  const email = { ...data, from: "jaroslava.moroziuk@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
