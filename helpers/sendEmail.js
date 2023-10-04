const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    sgMail.send({...data, from: 'o.yemelianov@yahoo.com' })
};

module.exports = sendEmail;