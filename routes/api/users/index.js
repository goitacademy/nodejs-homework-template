const express = require("express");
const router = express.Router();

const currentRouter = require("./current");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const signupRouter = require("./signup");
const avatarsRouter = require("./avatars");

router.use("/current", currentRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/signup", signupRouter);
router.use("/avatars", avatarsRouter);

module.exports = router;
