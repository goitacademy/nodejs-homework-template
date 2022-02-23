const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const {SENDGRID_KEY} = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const senderEmail = "profiko.ch.p@gmail.com";

const setndMail = async (data) => {
    const mail = {...data, from: senderEmail}
        await sgMail.send(mail);
        return true
}

module.exports = setndMail;