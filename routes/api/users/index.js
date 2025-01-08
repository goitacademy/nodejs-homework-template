const express = require("express");
const router = express.Router();

const currentRouter = require("./current");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const signupRouter = require("./signup");
const avatarsRouter = require("./avatars");
const verifyRouter = require("./verify");
const resendVerifyRouter = require("./resendVerify");

router.use("/current", currentRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/signup", signupRouter);
router.use("/avatars", avatarsRouter);
router.use("/verify", verifyRouter);
router.use("/verify/resend", resendVerifyRouter);

module.exports = router;
