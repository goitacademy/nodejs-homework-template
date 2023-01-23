const sgMail = require('@sendgrid/mail');
require('dotenv').config()

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

/*
const data = {
    to: 'pasebin909@minterp.com',  
    subject: 'Veryfy email',
    html:'<p>Veryfy email</p>'    
}
*/
const sendEmail = async (data) => {
    const email = { ...data, from: 'vitaospanova@ukr.net'};
    try {
        await sgMail.send(email);
        return true;        
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = sendEmail;

