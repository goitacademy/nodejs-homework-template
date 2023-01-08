const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");

const {
  checkJwt,
  checkLogin,
  checkRegister,
  upLoad,
  checkEmail,
} = require("../../middlewares");

router.post("/signup", checkRegister, ctrl.signUp);

router.post("/login", checkLogin, ctrl.logIn);

router.get("/logout", checkJwt, ctrl.logOut);

router.get("/current", checkJwt, ctrl.current);

router.patch("/avatar", checkJwt, upLoad.single("avatar"), ctrl.avatar);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", checkEmail, ctrl.resendVerify);

module.exports = router;
