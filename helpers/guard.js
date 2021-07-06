const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return next({
        status: HttpCode.FORBIDDEN,
        message: 'Forbidden',
      })
    }
    req.user = user
    // res.locals.user = user переменная на текущем запросе
    // req.app.locals.vars - глобальная переменная

    return next()
  })(req, res, next)
}

module.exports = guard
