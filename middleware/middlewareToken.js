const passport = require('passport')
require('../config/passport')
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
// const { JWT_SECRET } = process.env
// const User = require('../models/schemas/users')

const midllwareToken = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        let token = null
        if (req.get('Authorization')) {
            token = req.get('Authorization').split('')[1]
        }
        if (!user || err || token !== user.token) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Not authorized'
            })
        }

        req.user = user
        return next()
    })(req, res, next)
}

module.exports = midllwareToken

// const params = {
//     secretOrKey: JWT_SECRET,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// }

// passport.use(new JwtStrategy(params, async (payload, done) => {
//     try {
//         const user = await User.findById(payload.id)

//         if (!user) {
//             return done(null, false)
//         } else {
//             return done(null, user);
//         }

//     } catch (err) {
//         return done(err, false)
//     }
// }))

// const middlewareToken = async (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, (err, user) => {
//         if (err || !user) {
//             return res.status(401).json({ message: 'Not authorized' })
//         }

//         req.user = user
//         next()
//     })(req, res, next)
//     console.log(passport.authenticate)
// }

// module.exports = middlewareToken