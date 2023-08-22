const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.controller");
const passport = require("passport");

const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res
        .status(401)
        .header("Content-Type", "application/json")
        .json({
          status: "unauthorized",
          code: 401,
          ResponseBody: {
            message: "Not authorized",
          },
        });
    }
    req.user = user;
    next();
  })(req, res, next);
};

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", auth, authController.logout);
router.get("/current", auth, authController.getCurrent);

module.exports = router;
