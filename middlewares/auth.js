const passport = require('passport');
module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if(!user || err) {
            return res.status(401).json({
                status: 'Unauthorized',
                code: 401,
                message: 'Unauthorized,'
            })
        }
        req.user = user
        next()
    })(req, res, next)
}

const passport = require('passport');
module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if(!user || err) {
            return res.status(401).json({
                status: 'Unauthorized',
                code: 401,
                message: 'Unauthorized,'
            })
        }
        req.user = user
        next()
    })(req, res, next)
}