const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const Users = require("../model/users-methods");
const { HttpCodes, Statuses } = require("./constants");
const { ResponseMessages } = require("./messages");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await Users.findUserById(payload.id);

      if (!user) {
        return done(new Error("User not found."));
      }

      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }),
);

const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    const headerAuth = req.get("Authorization");
    let token = null;

    if (headerAuth) {
      token = headerAuth.split(" ")[1];
    }

    if (error || !user || token !== user?.token) {
      return res.status(HttpCodes.UNAUTHORIZED).json({
        status: Statuses.error,
        code: HttpCodes.UNAUTHORIZED,
        message: ResponseMessages.notAuthorized,
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = isLoggedIn;