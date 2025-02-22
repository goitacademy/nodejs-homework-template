const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const contactsRouter = require("./contacts");
const author = require("../../middleware/author");
router.use("/users", usersRouter);
router.use("/contacts", author, contactsRouter);

module.exports = router;
