const express = require("express");
const router = express.Router();

const currentRouter = require("./current");
const loginRouter = require("./login");
const logoutRouter = require("./logout");
const signupRouter = require("./signup");

router.use("/current", currentRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/signup", signupRouter);

module.exports = router;
