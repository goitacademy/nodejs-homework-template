const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('./models/models/users')
const dotenv = require('dotenv')

dotenv.config()
const secret = process.env.JWT_SECRET

const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        },
        async (jwtPayload, done) => {
            try {
                const user = await User.findById(jwtPayload.userId).select(
                    '-password'
                )
                console.log(user)
                if (!user) {
                    return done(null, false, { message: 'Not authorized' })
                }

                return done(null, user)
            } catch (error) {
                return done(error, false)
            }
        }
    )
)

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Not authorized' })
        }
        req.user = user
        next()
    })(req, res, next)
}
module.exports = auth
