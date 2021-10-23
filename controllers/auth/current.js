const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const signout = async (req, res) => {
  const { email } = req.body
  await User.findOne({ email })
  if (!email) {
    throw new Unauthorized('Not authorized')
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      email,
      subscription: 'starter',
    },
  })
}

module.exports = signout
