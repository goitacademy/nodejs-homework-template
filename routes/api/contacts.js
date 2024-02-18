const express = require("express");
const ctrlContact = require("../../controller/contacts.js");

const router = express.Router();

router.get("/contacts", ctrlContact.getContacts);

router.get("/contacts/:contactId", ctrlContact.getById);

router.post("/contacts", ctrlContact.createContact);

router.put("/contacts/:contactId", ctrlContact.updateContact);

router.patch("/contacts/:contactId/status", ctrlContact.updateContactStatus);

router.delete("/contacts/:contactId", ctrlContact.removeContact);

module.exports = router;
