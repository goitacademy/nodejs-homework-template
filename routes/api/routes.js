const express = require("express");
const contactRouter = require("./contacts");
const userRouter = require("./users");

const router = express.Router();
router.use("/api/contacts", contactRouter);
router.use("/api/users", userRouter);

module.exports = router;