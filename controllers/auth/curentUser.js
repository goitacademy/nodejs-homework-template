const { User } = require('../../models')

const curentUser = async (req, res) => {
  const { _id, email, subscription } = req.user
  await User.findByIdAndUpdate(_id)
  res.json({
    status: 'OK',
    code: 200,
    message: 'Current user',
    body: {
      email,
      subscription,
    },
  })
}

module.exports = curentUser
