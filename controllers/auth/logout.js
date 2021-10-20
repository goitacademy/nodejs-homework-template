const { User } = require('../../models')

const logout = async (req, res) => {
  console.log(req.user)
  await User.findByIdAndUpdate(req.user._id, { token: null })
  res.json({
    status: 'success',
    code: 200,
    message: 'Success logout',
  })
}

module.exports = logout
