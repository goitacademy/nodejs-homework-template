const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (userEmail, verificationToken) => {
  const msg = {
    to: userEmail,
    from: SENDGRID_SENDER,
    subject: "Email confirmation",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Please, click here to confirm mail</a>`,
  };
  try {
    const response = await sgMail.send(msg);
    console.log(`statusCode: ${response[0].statusCode}. Email sent!`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendEmail,
};
