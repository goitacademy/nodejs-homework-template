const sendGridEmail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sendGridEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    await sendGridEmail.send({ ...data, from: "bogdan.k1990@gmail.com" });
    return true;
  } catch (error) {
    throw new Error("Error sending email");
  }
};

module.exports = sendEmail;
