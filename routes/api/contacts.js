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

const { authorize } = require("../../auth/authorize.middleware");

// authorize

const router = express.Router();

router.get("/", authorize(), listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateAddedContact, authorize(), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateUpdatedContact, updateContact);

router.patch("/:contactId/favorite", validateFavField, updateStatusContact);

module.exports = router;
