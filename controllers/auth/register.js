const bcrypt = require('bcryptjs')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')

const { User } = require('../../model')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const avatarURL = `https:${gravatar.url(email)}`
  const result = await User.create({ avatarURL, email, password: hashPassword })
  const id = result._id.toString()
  const dirPath = path.join(avatarsDir, id)
  await fs.mkdir(dirPath)
  res.status(201).json(result)
}

module.exports = register
