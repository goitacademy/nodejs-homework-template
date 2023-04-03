const express = require("express");
const contactRouter = require("./contacts");

const loginRouter = require("./login");
const registrationRouter = require("./register");
const logoutRouter = require("./logout");
const currentRouter = require("./currentUser");

const router = express.Router();

router.use("/contacts", contactRouter);
router.use("/users", loginRouter);
router.use("/users", registrationRouter);
router.use("/logout", logoutRouter);
router.use("/current", currentRouter);

module.exports = router;
