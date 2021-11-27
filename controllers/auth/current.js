const { User } = require('../../models')

const current = async (req, res) => {
  const { _id } = req.user
  await User.findById(_id)

  res.json({
    status: 'success',
    code: 200,
    data: {
      email: req.user.email,
      subscription: 'starter',
    },
  })
}

module.exports = current
