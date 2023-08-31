const express = require("express");

const {
  listContacts,
  addContact,
  getContactById,
  updateContact,
  updateStatusContact,
  removeContact,
} = require("../../api/contacts/contacts");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, listContacts);

router.post("/", authenticate, addContact);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put("/:contactId", authenticate, isValidId, updateContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateStatusContact
);

module.exports = router;
