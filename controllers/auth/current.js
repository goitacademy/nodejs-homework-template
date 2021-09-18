const { Unauthorized } = require('http-errors')
const { User } = require('../../model')

const current = async (req, res) => {
  const { email, subscription } = await User.findOne({ token: req.user.token })

  if (!email) {
    throw new Unauthorized('Not authorized')
  }
  res.json({ email, subscription })
}

module.exports = current
