const passport = require("passport");
require("../config/passport");
const { StatusCode } = require("../config/constants");

const UNAUTHORIZED = StatusCode.UNAUTHORIZED;

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token =
      req.get("Authorization") === null ||
      req.get("Authorization") === undefined
        ? undefined
        : req.get("Authorization").split(" ")[1];

    if (!user || err || token !== user.token) {
      return res.status(UNAUTHORIZED).json({
        status: "error",
        code: UNAUTHORIZED,
        message: "Not authorized!",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;