const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res
        .status(401)
        .header("Content-Type", "application/json")
        .json({
          status: "unauthorized",
          code: 401,
          ResponseBody: {
            message: "Not authorized",
          },
        });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
    auth,
}