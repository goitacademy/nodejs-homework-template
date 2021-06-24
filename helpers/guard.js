const passport = require("passport");
const { HTTP_CODE } = require("../helpers/constants");
require("../config/passport");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    let token = null;
    if (req.get("Authorization")) {
      token = req.get("Authorization").split(" ")[1];
    }
    if (!user || err || token !== user.token) {
      return res.status(HTTP_CODE.UNAUTHORIZED).json({
        Status: `${HTTP_CODE.UNAUTHORIZED} Unauthorized`,
        ResponseBody: {
          message: "Not authorized",
        },
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
