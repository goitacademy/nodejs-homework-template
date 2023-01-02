const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");
const { checkJwt, checkLogin, checkRegister } = require("../../middlewares");

router.post("/signup", checkRegister, ctrl.signUp);
router.post("/login", checkLogin, ctrl.logIn);
router.get("/logout", checkJwt, ctrl.logOut);
router.get("/current", checkJwt, ctrl.current);

module.exports = router;
