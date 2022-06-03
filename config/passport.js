const passport = require("passport");
const passportJWT = require("passport-jwt");
const {User} = require('../service/schemas/users');
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
require('dotenv');

const secret = process.env.SECRET;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

passport.use(
  new Strategy(params, (payload, done) => {
    User.findOne({_id: payload.id}).then(user => {
      if(!user) {return done(new Error("User not found"))};
      return done(null, user)
    }).catch(err => done(err))
  })
)