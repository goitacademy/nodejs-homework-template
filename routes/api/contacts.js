const express = require("express");

const router = express.Router();

const { addPostValidation } = require("../../validationMiddleware");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addPostValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", addPostValidation, updateContact);

module.exports = { contactsRouter: router };
