const passport = require("passport");

const auth = async (req, res, next) => {
  try {
    await passport.authenticate("jwt", { session: false }, (err, user) => {
      if (!user || err || user.token === null) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    })(req, res, next);
  } catch (error) {
    return res.status(500).json({ error: error.details[0].message });
  }
};
module.exports = auth;
