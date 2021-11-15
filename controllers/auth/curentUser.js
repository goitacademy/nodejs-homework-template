const { User } = require('../../models')

const curentUser = async (req, res) => {
  const { _id } = req.user
  const { email, subscription } = await User.findOne(_id)
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
