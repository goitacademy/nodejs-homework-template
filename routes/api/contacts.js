const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../service/contacts");

const {
  validateAddedContact,
  validateUpdatedContact,
  validateFavField,
} = require("../../middleware/validation");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateAddedContact, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateUpdatedContact, updateContact);

router.patch("/:contactId/favorite", validateFavField, updateStatusContact);

module.exports = router;
