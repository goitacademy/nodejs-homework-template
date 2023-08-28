const express = require("express");

const { isValidId } = require("../../middleVares");

const contacts = require("../../models/contacts.js");

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:id", isValidId, contacts.getContactById);

router.post("/", contacts.addContact);

router.put("/:id", isValidId, contacts.updateContact);

router.patch("/:id/favorite", isValidId, contacts.updateStatusContact);

router.delete("/:id", isValidId, contacts.removeContact);

module.exports = router;
