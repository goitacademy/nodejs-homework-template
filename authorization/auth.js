const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "fail",
        code: 401,
        data: "Unauthorized",
        ResponseBody: {
          message: "Not authorized",
        },
      });
    }

    const tokenFromHeader = req.headers.authorization;
    if (!tokenFromHeader || !tokenFromHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "fail",
        code: 401,
        data: "Unauthorized",
        ResponseBody: {
          message: "Token missing or invalid",
        },
      });
    }

    const token = tokenFromHeader.replace("Bearer ", "");
    if (token !== user.token) {
      return res.status(401).json({
        status: "fail",
        code: 401,
        data: "Unauthorized",
        ResponseBody: {
          message: "Token mismatch",
        },
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  auth,
};
