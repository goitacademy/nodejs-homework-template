const fs = require('fs/promises')
const path = require('path')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { Conflict } = require('http-errors')

const { User } = require('../../models')

const userDir = path.join(__dirname, '../../', 'public/avatars')

const signup = async (req, res) => {
  const { email, password } = req.body
  const avatar = gravatar.url(email, { s: '100' }, true)

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  const result = await User.create({ email, password: hashPassword, avatarURL: avatar })

  const id = result._id.toString()
  const dirPath = path.join(userDir, id)
  await fs.mkdir(dirPath)

  res.status(201).json({
    status: 'succes',
    code: 201,
    user: {
      email: result.email,
      subscription: result.subscription
    }
  })
}

module.exports = signup
