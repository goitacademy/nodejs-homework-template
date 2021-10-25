const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4 } = require('uuid')

const { sendEmail } = require('../../helpers')

const { User } = require('../../models/user')

const register = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email is use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const verifyToken = v4()
  const newUser = {
    email,
    password: hashPassword,
    avatarURL: gravatar.url(email),
    verifyToken
  }
  await User.create(newUser)

  const msg = {
    to: email,
    subject: 'Подтверждение регистрации на сайте',
    html: `
    <a href='http://localhost:3000/api/v1/auth/verify/${verifyToken}' target='_blank'>Подтвердить почту - ${email}</a>`
  }

  await sendEmail(msg)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    data: newUser
  })
}

module.exports = register
