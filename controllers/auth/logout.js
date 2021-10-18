const { Unauthorized } = require('http-errors')
const { User } = require('../../models')

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  if (!_id) {
    throw new Unauthorized('Not authorized')
  }

  res.status(204).json()
}

module.exports = logout
