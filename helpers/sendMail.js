const nodemailer = require('nodemailer')
require('dotenv').config();
const {UKRNET_PASSWORD_IMAP} = process.env

const nodemailerConfig = { 
    host: "smtp.ukr.net",
    port: 465,// 2525
    secure: true,
    auth:{
      user: 'nodemailjs@ukr.net',
      pass: UKRNET_PASSWORD_IMAP,
    }
  }
  
  const transport = nodemailer.createTransport(nodemailerConfig);
  
  const mail = { 
    to: "risala@ukr.net",
    from: 'nodemailjs@ukr.net',
    subject: "підтвердження рееєстрації",
    html: "<p>дякуємо за реєстрацію</p>"
  }
  
const sendMail = {
    transport,
    mail,
}

  module.exports = sendMail

//   transport.sendMail(mail)
//   .then(() => console.log("email sent success"))
//   .catch(err => console.log(err.message))
