const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("./../models/user");

require("dotenv").config();
const secret = process.env.PASSWORD;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    // it will be only one element, so I can use User.findOne or User.find ... .then(([ one element from array]))
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User is not here anymore"));
        }
        // I don't need to write else (if ... else ... ) becouse abrove is used return
        return done(null, user);
      })
      .catch((error) => done(error));
  })
);
