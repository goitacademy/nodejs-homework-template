const express = require("express");
const router = express.Router();

const auth = require("../../middleware/user")

const contactsRouter = require("./contacts");
router.use("/contacts", auth, contactsRouter);

const usersRouter = require("./auth");
router.use("/users", usersRouter);

module.exports = router;
