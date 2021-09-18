const { Unauthorized } = require('http-errors')

const { User } = require('../../model')

const logout = async(req, res) => {
  const user = await User.findByIdAndUpdate(req.user, { token: null })

  if (!user) {
    throw new Unauthorized('Not authorized')
  }

  res.status(204).json({ message: 'No Content' })
}

module.exports = logout
