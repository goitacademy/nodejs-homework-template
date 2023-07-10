const passport = require("passport");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err || user.token !== token) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
module.exports = {
  auth,
};
