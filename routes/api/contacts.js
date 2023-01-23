const express = require("express");
const router = express.Router();
const { addValidation } = require("../../validation.js");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", addValidation, updateContact);

module.exports = router;
