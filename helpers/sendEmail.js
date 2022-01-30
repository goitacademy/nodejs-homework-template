const sgMail = require('@sendgrid/mail')
require('dotenv').config()

// const { SENDGRID_API_KEY } = process.env
// sgMail.setApiKey(SENDGRID_API_KEY)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (data) => {
  try {
    const email = { ...data, from: 'juliavladomira@gmail.com' }
    await sgMail.send(email)
    return true
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
module.exports = { sendMail }
// const email = {
//   to: 'hipsonomli@vusra.com',
//   from: 'juliavladomira@gmail.com',
//   subject: 'Новая заявка с сайта',
//   html: '<p>Здравствуйте, ваша заявка принята<p>',
// }

//   sgMail
//     .send(email)
//     .then(() => console.log('Email send success'))
//     .catch((error) => console.log(error.message))
