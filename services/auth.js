const passport = require('passport')
require('../config/config-passport')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null
    const header = req.get('Authorization')
    if (header) {
      token = header.split(' ')[1]
    }

    if (!user || err || token !== user.token) {
      return res.json({
        status: 401,
        message: 'Not authorized'
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}

module.exports = auth
