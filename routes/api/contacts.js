const express = require("express");

const {
  listContacts,
  addContact,
  getContactById,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../../api/contacts/contacts");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", listContacts);

router.post("/", addContact);

router.get("/:contactId", isValidId, getContactById);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
