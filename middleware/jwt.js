import passport from "passport";

export default function authMiddleware(req, res, next) {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user) {
      res.status(401).json({ message: "Unauthorized" });
    }
    res.locals.user = user;
    next();
  })(req, res, next);
}
