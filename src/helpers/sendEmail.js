const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: 'antifishka.zp@gmail.com' };
        
    await sgMail.send(email);
};  

module.exports = sendEmail;

