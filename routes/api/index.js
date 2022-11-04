const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const contactsRouter = require("./contacts");

router.use("/users", usersRouter);
router.use("/contacts", contactsRouter);

module.exports = router;