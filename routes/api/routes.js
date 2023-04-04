const express = require("express");
const contactRouter = require("./contacts");
const userRouter = require("./users");

const router = express.Router();
router.use("/contacts", contactRouter);
router.use("/users", userRouter);

module.exports = router;