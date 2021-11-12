const { User } = require('../../models')

const currentUser = async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({
    status: 'succes',
    code: 200,
    data: {
      email: user.email,
      subscription: user.subscription
    }

  })
}

module.exports = currentUser
