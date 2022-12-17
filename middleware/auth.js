const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        message: "Email or password is wrong",
        status: "401 Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
