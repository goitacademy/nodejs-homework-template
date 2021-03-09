const passport = require('passport')
require('../configs/passport')
const { HttpCode } = require('../helpers/constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    const [, token] = req.get('Authorization').split(' ')
    if (error || !user || token !== user.token) {
      return next({
        status: HttpCode.UNATHORIZED,
        message: 'Not authorized',
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = guard
