const passport = require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt')

const {UserService} = require('../services/userService')



require('dotenv').config()
const SECRET_KEY = process.env.JWT_KEY



var params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(new Strategy(params, async (payload, done) => {    
    try {
        const service = new UserService()
        const user = await service.getById(payload.id)
        
        if(!user) {
            done(new Error('User not found'))
        }
        if(!user.token) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error)
    }
    
}));