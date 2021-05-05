const { HttpCode } = require('../helpers/constants');

const role = (role) => (req, res, next) => {
  const roleUser = req.user.gender
  if (roleUser !== role) {
    return res.status(HttpCode.FORBIDDEN).json({
      status: 'error',
      code: HttpCode.FORBIDDEN,
    message: "Access denied"
    })
  }
  return next()
}

module.exports = role
  




