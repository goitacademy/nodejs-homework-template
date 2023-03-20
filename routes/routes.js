const express = require("express");
const contactsRouter = require("./contacts");

const router = express.Router();

router.use('/api/contacts', contactsRouter)

module.exports = router;