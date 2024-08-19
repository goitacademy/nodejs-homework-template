const express = require("express");
const router = express.Router();
const contactsRouter = require("./contacts");

router.use("api/contacts", contactsRouter);

module.exports = router;
