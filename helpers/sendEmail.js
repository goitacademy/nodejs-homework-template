const sgEmail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "bohdan.strilets@gmail.com" };

  try {
    await sgEmail.send(email);
    return true;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
