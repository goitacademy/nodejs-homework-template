const express = require("express");
const router = express.Router();

const indexContactsRouter = require("../controllers/contacts/indexContacts");
const showContactsRouter = require("../controllers/contacts/showContacts");
const createContactsRouter = require("../controllers/contacts/createContacts");
const updateContactsRouter = require("../controllers/contacts/updateContacts");
const deleteContactsRouter = require("../controllers/contacts/deleteContacts");

router.use("/index", indexContactsRouter);
router.use("/show", showContactsRouter);
router.use("/create", createContactsRouter);
router.use("/update", updateContactsRouter);
router.use("/delete", deleteContactsRouter);

module.exports = router;
