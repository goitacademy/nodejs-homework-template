const { User } = require('../../model')

const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { token: null })
  res.json({ message: 'logout success' })
}

module.exports = logout
