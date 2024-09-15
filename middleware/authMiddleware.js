const passport = require("passport");
const User = require("../services/schemas/userSchema");

const authMiddleware = (req, res, next) => {
  passport.authenticate(
    "jwt",
    {
      session: false,
    },
    async (err, user) => {
      if (!user || err) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      const foundUser = await User.findById(user._id);
      if (
        !foundUser ||
        foundUser.token !== req.headers.authorization.split(" ")[1]
      ) {
        return res.status(401).json({ message: "Unauthorized!" });
      }
      req.user = foundUser;
      next();
    },
  )(req, res, next);
};

module.exports = {
  authMiddleware,
};
