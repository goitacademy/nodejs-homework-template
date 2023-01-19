const sgMail = require('@sendgrid/mail');
require("dotenv").config()

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

/]}

module.exports = sendEmail;

