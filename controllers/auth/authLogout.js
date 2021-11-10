const { logoutUser } = require('../../model/auth')

const authLogout = async (req, res, next) => {
  await logoutUser(req.user)
  res.json({
    status: 'success',
    code: 200,
    message: 'Success logout'
  })
}

module.exports = authLogout
