const { User } = require('../../models/user')

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: '' })
  res.json({
    message: 'Logout success',
  })
}

module.exports = logout
// 1:04:09
// https://www.youtube.com/watch?v=e_ZQX6V7P0Y
