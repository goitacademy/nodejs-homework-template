const passport = require("passport");
const jwt = require("jsonwebtoken");
require("../config/passport");
require("dotenv").config();
const secret = process.env.SECRET_JWT;

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    jwt.verify(token, secret, function (error, decoded) {
      if (error) {
        return res.status(401).json({
          status: "error",
          code: 401,
          message: "Unauthorized",
        });
      }
    });

    // if (!user || err || user.token !== token) {
    //   return res.status(401).json({
    //     status: "error",
    //     code: 401,
    //     message: "Unauthorized",
    //   });
    // }

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;
