const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/contacts", listContacts);

router.get("/contacts/:contactId", getContactById);

router.post("/contacts", addContact);

router.delete("/contacts/:contactId", removeContact);

router.put("/contacts/:contactId", updateContact);

module.exports = router;
