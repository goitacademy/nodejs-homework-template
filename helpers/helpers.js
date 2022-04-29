require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const {SENDGRID_API_KEY} = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = {...data, from: 'sotskiydr@meta.ua'};
    try{
        await sgMail.send(email);
        return true;
    }catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = sendEmail;