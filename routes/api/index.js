const express = require("express");
const contactRouter = require("./contactRouter");
const authRouter = require("./authRouter");
const router = express.Router();
const authMiddleware = require("../../middleware/jwt.js");

router.use("/contacts", authMiddleware, contactRouter);
router.use("/users", authRouter);

module.exports = router;