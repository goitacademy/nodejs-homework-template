const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controllers/contacts");

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", ctrlContacts.addContact);

router.delete("/:contactId", ctrlContacts.deleteContact);

router.put("/:contactId", ctrlContacts.updateContact);

module.exports = router;
