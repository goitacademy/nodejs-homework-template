const express = require("express");
const router = express.Router();
const ctrlContact = require("../../controller/contacts.js");

router.get("/contacts", ctrlContact.getContacts);

router.get("/contacts/:contactId", ctrlContact.getById);

router.post("/contacts", ctrlContact.createContact);

router.put("/contacts/:contactId", ctrlContact.updateContact);

router.patch("/contacts/:contactId/status", ctrlContact.updateContactStatus);

router.delete("/contacts/:contactId", ctrlContact.removeContact);

module.exports = router;
