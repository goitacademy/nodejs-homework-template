const { User } = require('../../models')
const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const signup = async (req, res) => {
  const { email, password, subscription } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with ${email} already exist`)
  }
  const avatarURL = gravatar.url(email)
  const hashPasswodr = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const result = await User.create({ email, password: hashPasswodr, subscription, avatarURL })
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        email,
        password,
        subscription,
        avatarURL
      }
    }
  })
}

module.exports = signup
