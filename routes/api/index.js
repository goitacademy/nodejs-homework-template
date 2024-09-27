const express = require("express");
const router = express.Router();
const contactsRouter = require("./contacts");
router.use("/contacts", contactsRouter);
module.exports = router;
