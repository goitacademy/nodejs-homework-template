const { BadRequest } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const recheck = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequest('Missing required field email')
  }

  const user = await User.findOne({ email })
  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const { verificationToken } = req.params
  const mail = {
    to: email,
    subject: 'Подтверждение регистрации',
    html: `<a href='http://localhost:3000/api/auth/verify/${verificationToken}'> Нажмите для подтверждения регистрации email</a>`,
  }

  await sendMail(mail)
  res.status(200).json({
    message: 'Verification email sent',
  })
}

module.exports = recheck
