const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const auth = req.get("Authorization");
    if (!auth) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }
    const [, token] = auth.split(" ");
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "Unauthorized",
        message: "Not authorized",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
