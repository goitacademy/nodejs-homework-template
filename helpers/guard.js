const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("../config/constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    const token = req.get("Authorization")?.split(" ")[1];
    // console.log(token);
    if (!user || error || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        cod: HttpCode.UNAUTHORIZED,
        message: "Invalid credentials",
      });
    }
    req.user = user;
    console.log(req.user);

    return next();
  })(req, res, next);
};
module.exports = guard;
