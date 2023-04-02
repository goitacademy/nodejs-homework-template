const express = require("express");
const contactRouter = require("./contacts");
const loginRouter = require("./login");
const registrationRouter = require("./register");

const router = express.Router();

router.use("/contacts", contactRouter);
router.use("/users", loginRouter);
router.use("/users", registrationRouter);

module.exports = router;
