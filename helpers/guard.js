const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("../config/constans");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.get("Authorization")?.split(" ")[1];
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Email or password is wrong",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
