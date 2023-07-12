const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function msg (data)  {
    const email = {
    ...data, 
    }
    sgMail(email)
    return true
}
module.exports = msg