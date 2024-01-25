import passport from "passport";

export default function auth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (e, user) => {
    if (e || !user) {
      return res.status(401).json("Token is invalid");
    }
    req.user = user;
    return next();
  })(req, res, next);
}
