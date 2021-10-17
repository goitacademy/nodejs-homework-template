const { logout } = require('../../model/users')

const logoutController = async (req, res, next) => {
  const { _id } = req.user
  await logout(_id)
  res.status(204).json()
}

module.exports = { logoutController }
