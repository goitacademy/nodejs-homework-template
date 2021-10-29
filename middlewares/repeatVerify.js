const { NotFound, BadRequest } = require('http-errors')
const { sendEmail } = require('../helpers')
const { User } = require('../model/user')

const repeatVerify = async (email) => {
  const user = await User.findOne(email)
  if (!user) {
    throw new NotFound(`No user with email ${email}. Please, check your request`)
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed.')
  } else {
    const mail = {
      to: user.email,
      subject: 'Подтверждение регистрации на сайте',
      html: `
    <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Нажмите для подтверждения email</a>`
    }
    await sendEmail(mail)
    return true
  }
}

module.exports = repeatVerify;
