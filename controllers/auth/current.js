const { User } = require('../../models')

const current = async (req, res) => {
  const { _id, email, subscription } = req.user

  await User.findById(_id, '_id email subscription')

  res.json({
    status: 'success',
    code: 200,
    data: {
      email,
      subscription,
    },
  })
}

module.exports = current
