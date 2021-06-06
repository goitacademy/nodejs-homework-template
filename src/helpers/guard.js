const passport = require("passport");
const { HttpCode } = require("./constants");

require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err || !user) {
      return next({
        status: HttpCode.FORBIDDEN,
        message: "Forbidden",
      });
    }

    req.user = user;

    return next();
  })(req, res, next);
};

module.exports = { guard };
