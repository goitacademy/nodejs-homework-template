const passport = require('passport')
require('../config/passport')
const {HttpCode} = require('./constans')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        let token = null
        if (reg.get('Authorization')) {
         token = reg.get('Authorization').split(' ')[1]   
        }
if (!user || err || token != user.token) {
    return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Access is denied',
    })
}
req.user = user
return next()
    })(req, res, next)
}

module.exports = guard