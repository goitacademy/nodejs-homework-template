const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { EMAIL_FROM, SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

/*
data={
 to: "ziltetekko@vusra.com",
  subject: "Подтверждение email",
  html: "<p>Пожалуйста, подтвердите Ваш email</p>",   
}
*/

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: `${EMAIL_FROM}` };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
