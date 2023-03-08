const express = require("express");
const path = require("path");

const router = express.Router();

const contactsPath = path.resolve("models/contacts.js");
const validationPath = path.resolve("validation/validation.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require(contactsPath);
const { validationAddContact, validationUpdContact } = require(validationPath);

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validationAddContact, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validationUpdContact, updateContact);

module.exports = router;
