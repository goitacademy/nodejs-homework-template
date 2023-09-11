const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../service/schemas/users");
require("dotenv").config();
const secret = process.env.SECRET;

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
  const token = req.headers.authorization?.split(" ")[1];
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user || !token || token !== user.token) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { auth };
