const { User } = require('../../models')
const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const singup = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const defaultAvatar = await gravatar.url(email, { s: '250' }, true)

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL: defaultAvatar
  })
  const dirPath = path.join(avatarDir, `${result._id}`)
  await fs.mkdir(dirPath)

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registration successful',
  })
  return result
}

module.exports = singup
