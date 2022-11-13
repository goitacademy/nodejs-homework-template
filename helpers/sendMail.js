const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const mail = { ...data, from: "lena.s26367@gmail.com" };
  await sgMail
    .send(mail)
    .then(console.log("Success"))
    .catch(console.log("Fail"));
};
module.exports = sendMail;
