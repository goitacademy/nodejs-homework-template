import passport from 'passport'

export const auth = (req, res, next) => {
  // Middleware unauthorized error
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: '401 - Unauthorized',
        'Content-Type': 'application/json',
        ResponseBody: {
          message: 'Unauthorized',
        },
      })
    }
    req.user = user
    return next()
  })(req, res, next)
}