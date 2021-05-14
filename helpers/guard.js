const passport = require("passport");
const { HttpCode } = require("./constants");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    // let token = null;
    // if (req.get("Authorization")) {
    //   console.log(
    //     "🚀 ~ file: guard.js ~ line 9 ~ passport.authenticate ~ req.get('Authorization')",
    //     req.get("Authorization")
    //   );

    //   token = req.get("Authorization").split(" ")[1];
    //   console.log(
    //     "🚀 ~ file: guard.js ~ line 15 ~ passport.authenticate ~  token",
    //     token
    //   );
    // }
    const token = req.get("Authorization")?.split(" ")[1];

    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORISED).json({
        status: "error",
        code: HttpCode.UNAUTHORISED,
        data: "Unauthorized",
        message: "Unauthorized. Access denied",
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
module.exports = guard;
