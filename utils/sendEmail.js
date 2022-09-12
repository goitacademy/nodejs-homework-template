const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_USERNAME } = process.env;

sgMail.setApiKey(SEND_GRID_USERNAME);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "goitnodesender@onet.eu" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;
