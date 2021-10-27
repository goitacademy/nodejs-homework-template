const { BadRequest } = require('http-errors')
const { User } = require('../../models')
const { sendMail } = require('../../utils')

const reverify = async req => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('Missind required failed email')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new BadRequest('Bad request')
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  if (!user.verify) {
    const verifyToken = user.verifyToken
    console.log(user.verifyToken)
    const data = {
      to: email,
      subject: 'Регистрация на сайте',
      html: `<a href='http://localhost:3000/api/auth/users/verify/${verifyToken}'>Подтвердите регистрацию</a>`,
    }
    await sendMail(data)
  }
}

module.exports = reverify
