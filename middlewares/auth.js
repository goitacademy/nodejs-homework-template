const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        data: "Not authorized",
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

module.exports = auth;
