const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts.controller");
const { validateContact } = require("../../models/validateContacts");
const { contactSchema } = require("../../models/contactsSchema");

const router = express.Router();

router.get("/", listContacts);

router.get(`/:id`, getContactById);

router.post("/", validateContact(contactSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateContact(contactSchema), updateContact);

module.exports = router;
