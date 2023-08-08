const passport = require("passport");
const passportJWT = require("passport-jwt");
require("dotenv").config();

const { User } = require("../models/user");

const secret = process.env.JWT_SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ _id: payload.id })
      .then(([user]) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  })
);

const auth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const token = bearerToken ? bearerToken.split(" ")[1] : null;

  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err || user.token !== token) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Unauthorized',
        data: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { auth };