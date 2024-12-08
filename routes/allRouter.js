const express = require("express");
const usersRouter = require("./usersRouter.js");
const contactsRouter = require("./contactsRouter.js");
const authMiddleware = require("../JWT/middlewareJWT.js");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/contacts", authMiddleware, contactsRouter);

module.exports = router;
