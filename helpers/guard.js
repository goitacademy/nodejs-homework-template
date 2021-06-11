const { HttpCode } = require("./constants");
const passport = require("passport");
require("../config/passport");

const quard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    let token = null;
    if (req.get("Authorization")) {
      token = req.get("Authorization").split(" ")[1];
    }
    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "Unauthorized",
        code: HttpCode.UNAUTORIZED,
        message: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = quard;
