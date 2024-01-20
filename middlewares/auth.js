import passport from "passport";

const auth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
      if (!user || err) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
          data: "Unauthorized",
        });
      }
  
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
  
      if (token !== user.token) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
          data: "Unauthorized",
        });
      }
  
      req.user = user;
      next();
    })(req, res, next);
  };
  export default auth