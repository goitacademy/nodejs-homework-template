const sgMail = require("@sendgrid/mail");
const { InternalServerError } = require("http-errors");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const mail = { ...data, from: "madden85@ukr.net" };
    await sgMail.send(mail);
    return true;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = sendMail;
