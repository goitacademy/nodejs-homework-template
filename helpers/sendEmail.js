const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "anastazja.knihnitska@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
