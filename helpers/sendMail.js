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
const verifyEmailFunc = (email, BASE_URL, verificationToken) =>{
  const verifyMail = {
    to: email,
    from: 'nodemailjs@ukr.net',
    subject: "підтвердження поштової скриньки",    
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  }
  return verifyMail
}
    
const sendMail = {
    transport,  
    verifyEmailFunc: verifyEmailFunc,
    mail,
}

  module.exports = sendMail

//   transport.sendMail(mail)
//   .then(() => console.log("email sent success"))
//   .catch(err => console.log(err.message))
