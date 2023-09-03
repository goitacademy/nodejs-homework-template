import passport from "../config/passport.js";

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const reqToken = req.headers["authorization"].slice(7);
    if (!user || err || user.token !== reqToken) {
      return res.status(401).json({
        status: "Unauthorized",
        code: 401,
        message: "Not authorized",
        data: "Not authorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default auth;
