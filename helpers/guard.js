const passport = require('passport')
require('../config/passport')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next({
        status: 401,
        message: 'Not authorized'
      })
    }
    req.user = user
  })(req, res, next)
  next()
}

module.exports = guard
