const express = require("express");
const Contacts = require("../../Controllers/Contacts");

const router = express.Router();

router.get("/", Contacts.listContacts);
router.get("/:contactId", Contacts.getContactById);
router.post("/", Contacts.addContact);
router.delete("/:contactId", Contacts.removeContact);
router.put("/:contactId", Contacts.updateContact);

module.exports = router;
