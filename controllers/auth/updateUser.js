const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const updateUser = async (req, res) => {
  const { _id, email } = req.user
  const { email: userEmail, subscription } = req.body

  await User.findOneAndUpdate(_id, { subscription })

  if (!_id || userEmail !== email) {
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
