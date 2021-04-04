const passport = require('passport')
require('../config/passport')
const { HttpCode} = require('./constans')

const guard = (req, res, next) => {
   passport.authenticate('jwt', { session: false}, (err, user) => {
    if (!user || err) {
        return res.status(HttpCode.UNAUTHORIZED).json({
          status: 'error',
          code: HttpCode.UNAUTHORIZED,
          message: 'Unauthorized',
          data: 'Unauthorized',
        })
      }
      req.user = user
      return next()
    })(req, res, next)
}
module.exports = guard