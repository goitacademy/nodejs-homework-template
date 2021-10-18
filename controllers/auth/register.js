const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const { User } = require('../../models/user')

const register = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const newUser = { email, password: hashPassword, avatarURL: gravatar.url(email) }
  await User.create(newUser)
  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Success register',
    data: newUser
  })
}

module.exports = register
