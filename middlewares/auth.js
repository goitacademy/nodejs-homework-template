const passport= require('passport')

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: 'Unauthorized',
          code: 401,
          message: "Not authorized"
         
        })
      }
      
      req.user = user
      console.log(req.user)
      next()
    })(req, res, next)
  }
module.exports = auth;