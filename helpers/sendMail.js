const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

// const data = {
//   to: "gopeje8467@v3dev.com",
//   subject: "test email",
//   html: "<p>test email</p>",
// };

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "marina18renkas@gmail.com" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
