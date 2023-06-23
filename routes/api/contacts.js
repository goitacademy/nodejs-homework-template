const express = require("express");
const contacts = require("../../controllers/contactsController");
const { tryCatchHandler } = require("../../helpers");
const router = express.Router();

router.get("/", tryCatchHandler(contacts.getAllContacts));

router.get("/:contactId", tryCatchHandler(contacts.getContactById));

router.post("/", tryCatchHandler(contacts.addContact));

router.delete("/:contactId", tryCatchHandler(contacts.deleteContact));

router.put("/:contactId", tryCatchHandler(contacts.updateContact));

module.exports = router;
