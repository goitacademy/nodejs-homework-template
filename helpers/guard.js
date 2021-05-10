  
const passport = require('passport')
require('../config/passport')
const httpCode = require('./httpCode')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    const rowToken = req.get('Authorization')
    if (rowToken) token = rowToken.split(' ')[1]
    if (!user || err || user.token !== token) {
      return res.status(httpCode.UNAUTHORIZED).json({
        status: 'error',
        code: httpCode.UNAUTHORIZED,
        message: 'Not authorized'
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}
module.exports = guard