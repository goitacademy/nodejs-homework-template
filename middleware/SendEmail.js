const  sgMail = require ("@sendgrid/mail");
require ("dotenv").config()

const {SENDGRID_API_KEY} =process.enb;

sgMail.setApiKey(SENDGRID_API_KEY);
const sendEmail =  async ( data) => {
    const email = {...data, from: " airveq@gmail.com "};
await sgMail.send(email);
return true;
};

module.exports = sendEmail;