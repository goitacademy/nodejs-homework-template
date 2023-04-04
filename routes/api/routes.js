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
router.use("/users", logoutRouter);
router.use("/users", currentRouter);

module.exports = router;
