const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
    const mail = {...data, from:'vlad11ponomarev@ukr.net'};
    await sgMail.send(mail);
    return true;
}

module.exports = sendEmail;