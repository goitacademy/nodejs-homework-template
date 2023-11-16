const express = require("express");
const router = express.Router();

const contactsRouter = require("./contacts");
router.use("/contacts", contactsRouter);

const usersRouter = require("./auth");
router.use("/users", usersRouter);

module.exports = router;
