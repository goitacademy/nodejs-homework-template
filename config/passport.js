const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../service/schemas/User");
const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const secret = process.env.SECRET;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findOne({ _id: payload.id })
      .then((user) => {
        console.log(user);
        if (!user) {
          return done(new Error("Not authorized"));
        }
        return done(null, user);
      })
      .catch((error) => {
        done(error);
      });
  })
);
