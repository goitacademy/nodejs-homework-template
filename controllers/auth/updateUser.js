const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const updateUser = async (req, res) => {
  const { email, subscription } = req.body

  await User.findOneAndUpdate(email, { subscription })

  if (!email) {
    throw new Unauthorized('Not authorized')
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      email,
      subscription,
    },
  })
}

module.exports = updateUser
