import passport from "passport";

export default function auth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (e, user) => {
    const token = req.headers.authorization.slice(7);
    if (e || !user || user.token !== token) {
      return res.status(401).json("Token is invalid");
    }
    req.user = user;
    return next();
  })(req, res, next);
}
