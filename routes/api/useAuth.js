const passport = require('passport')

const useAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (!user || error) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorize',
      })
      return
    }
    req.user = user
    next()
  })
}

module.exports = useAuth
