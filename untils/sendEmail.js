const sgMail = require('@sendgrid/mail');
const {SENDGRID_TOKEN} = require('../constants/env')
sgMail.setApiKey(SENDGRID_TOKEN);

const sendEmail = async (data) => {
    const email = {...data,from:'mykolavladi2@gmail.com'}
    console.log(email)
   await sgMail.send(email)
   return true
}
module.exports = {sendEmail}