const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const {
  validation,
  validationPatch,
} = require("../../middleware/validationMiddleware");

const router = new express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validation, updateContact);

router.patch("/:contactId/favorite", validationPatch, updateStatusContact);

module.exports = router;
