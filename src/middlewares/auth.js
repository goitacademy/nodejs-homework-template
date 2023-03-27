const passport = require("passport");
require("dotenv").config();

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
