const nodemailer = require("nodemailer")
require("dotenv").config()
const { USER, PASS } = process.env

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: USER,
    pass: PASS,
  },
})

// const mail = {
//   from: USER,
//   to: "lenagritsishina@gmail.com",
//   subject: "Test mail",
//   text: "Test hello",
//   html: `<h5>Verify your email:</h5> <a href = "https://users/verify/:${}</a>`,
// }

// const nodemailerFunction = async function main() {
//   const sendMail = await transporter.sendMail(mail)
//   console.log(sendMail)
//   console.log(nodemailer.getTestMessageUrl(sendMail))
// }

// nodemailerFunction().catch(console.error)

module.exports = {
  transporter,
}
