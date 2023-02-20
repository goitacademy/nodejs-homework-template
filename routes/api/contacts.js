const express = require("express");
const router = express.Router();

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

router.get("/", listContacts);
router.get("/:contactId", getById);
router.post("/", addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = { contactsRouter: router };
