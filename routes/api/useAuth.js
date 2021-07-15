const passport = require('passport')

const useAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (!user || error) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Not authorized'
            })
        }
        req.user = user
        next()
    })
}

module.exports = useAuth
