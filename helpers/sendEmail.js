const sgMail = require('@sendgrid/mail')
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "asil_198609@bigmir.net" };
    sgMail.send(email);
    return true;
}

module.exports = sendEmail;