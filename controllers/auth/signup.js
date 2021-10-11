const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
const sendSuccessResponse = require('../../helpers')
const { User } = require('../../models')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user) {
    throw new Conflict('Email in use')
  }

  const avatar = gravatar.url(email, { s: '250', d: 'identicon' }, true)

  const newUser = new User({ email })
  newUser.setPassword(password)
  newUser.setAvatar(avatar)
  const result = await newUser.save()
  sendSuccessResponse(res, { data: result }, 201)
}

module.exports = {
  signup
}
