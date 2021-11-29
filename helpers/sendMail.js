const sendGrid = require('@sendgrid/mail')
require('dotenv').config()
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (email, verificationToken) => {
  const mailMarkup = `<p>Hello there! Please verify your email by clicking that button!</p> <button type="button"><a href="http://localhost:8081/api/users/verify/${verificationToken}">BUTTON</a></button>`
  const msg = {
    to: email,
    from: 'bogdank208@gmail.com',
    subject: 'Please verify email!',
    html: mailMarkup
  }
  await sendGrid.send(msg)
}

module.exports = {
  sendMail
}
