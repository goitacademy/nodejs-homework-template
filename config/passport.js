const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../service/schemas/users");
const getAllUsers = require("../models/users");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.SECRET_WORD;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findOne({ _id: payload.id })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "User not found" });
        }
        return done(null, user);
      })
      .catch((err) => done(err, false, { message: "Error finding user" }));
  })
);

const auth = async (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, async (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
          data: "Unauthorized",
        });
      }

      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      const allUsers = await getAllUsers();
      const tokenExists = allUsers.some((user) => user.token === token);
      if (!tokenExists) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Token is not authorized",
          data: "Token not authorized",
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "An error occurred during authentication.",
    });
  }
};

module.exports = auth;
