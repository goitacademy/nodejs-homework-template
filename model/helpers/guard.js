const passport = require('passport')
require('../../config/passport')
const { httpCode } = require('./constants')

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || error) {
            return res.status(httpCode.FORBIDDEN).json({
                status: 'error',
                code: httpCode.FORBIDDEN,
                data: 'Forbidden',
                message: 'Invalid credentials'
            })

        }
        req.user = user
        return next()
    })(req, res, next)
}

module.exports = guard