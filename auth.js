import passport from "passport";

const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", (err, user) => {
    if (!user || err) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.user = user;
    next();
  })(req, res, next);
};

export default authMiddleware;
