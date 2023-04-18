const express = require("express");

const {
  getAllContacts,
  getContact,
  addNewContact,
  deleteContact,
  editContact,
} = require("../../controllers/controllers.js");
const {
  validateAddContact,
  validateUpdateContact,
} = require("../../validation/validate.js");

const router = express.Router();
const {
  contactsAddSchema,
  contactsEditSchema,
} = require("../../scheme/scheme.js");

router.get("/", getAllContacts);

router.get("/:contactId", getContact);

router.post("/", validateAddContact(contactsAddSchema), addNewContact);

router.put("/:contactId", validateUpdateContact(contactsEditSchema), editContact);

router.delete("/:contactId", deleteContact);

module.exports = router;
