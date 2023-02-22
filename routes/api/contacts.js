const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { validatePost, validatePut } = require("../../models/validation");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validatePost, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validatePut, updateContact);

module.exports = router;
