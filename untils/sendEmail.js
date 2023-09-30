const sgMail = require('@sendgrid/mail');
const {SENDGRID_TOKEN,SEND_FROM_EMAIL} = require('../constants/env')
sgMail.setApiKey(SENDGRID_TOKEN);

const sendEmail = async (data) => {
    const email = {...data,from:SEND_FROM_EMAIL}
   await sgMail.send(email)
   return true
}
module.exports = {sendEmail}