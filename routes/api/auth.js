const express = require("express");
const router = express.Router();
const AuthControll = require("../../controll/auth");
const jsonParser = express.json();
const auth = require("../../middlewares/auth");
const { schemas } = require("../../models/user");
const { validateFavorite } = require("../../middlewares");

router.post(
    "/register",
    jsonParser,
    validateFavorite(schemas.registerSchema),
    AuthControll.register
);
router.post(
    "/login",
    jsonParser,
    validateFavorite(schemas.loginSchema),
    AuthControll.login
);
router.post("/logout", auth, AuthControll.logout);
router.get("/current", auth, AuthControll.current);
router.post("/verify:token", AuthControll.verify);
router.post("/verify", jsonParser, AuthControll.reVerification);

module.exports = router;