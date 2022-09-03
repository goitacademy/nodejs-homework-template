const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddleware");

const router = new express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContactValidation, updateContact);

module.exports = router;
