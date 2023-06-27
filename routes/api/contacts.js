const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts.controller");
const {
  validatePostContact,
  validatePutContact,
} = require("../../models/validateContacts");
const { contactSchema } = require("../../models/contactsSchema");

const router = express.Router();

router.get("/", listContacts);

router.get(`/:id`, getContactById);

router.post("/", validatePostContact(contactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validatePutContact(contactSchema), updateContact);

module.exports = router;
