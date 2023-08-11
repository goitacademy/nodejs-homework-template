const express = require("express");

const contacts = require("../../models/contacts.js");

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:id", contacts.getContactById);

router.post("/", contacts.addContact);

router.delete("/:id", contacts.removeContact);

router.put("/:id", contacts.updateContact);

module.exports = router;
