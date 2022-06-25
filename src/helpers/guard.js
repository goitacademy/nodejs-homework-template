const passport = require('passport')

require('./../config/passport')
const { HTTP_CODES } = require('./constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const headerAuth = req.get('Authorization')
    let token = null
    if (headerAuth) {
      token = headerAuth.split(' ')[1]
    }
    if (err || !user || token !== user?.token) {
      return next({
        status: HTTP_CODES.FORBIDDEN,
        code: HTTP_CODES.FORBIDDEN,
        message: 'Not authorized',
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = guard