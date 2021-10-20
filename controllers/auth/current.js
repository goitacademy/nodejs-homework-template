const { User } = require('../../models')

const current = async (req, res, _) => {
  const [{ _id: id, email, subscription }] = await User.find(req.user)
  res.json({
    status: 'success',
    code: 200,
    data: {
      id,
      email,
      subscription,
    },
  })
}

module.exports = current
