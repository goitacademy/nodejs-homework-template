const express = require("express");
const authRouter = require("./authRouter.js");
const contactsRouter = require("./contactsRouter.js");
const authMiddleware = require("../JWT/middlewareJWT.js");

const router = express.Router();

router.use("/users", authRouter);
router.use("/contacts", authMiddleware, contactsRouter);

module.exports = router;
