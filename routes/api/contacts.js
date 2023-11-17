const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  favoriteContact,
  partiallyContact,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", favoriteContact);

router.patch("/:contactId", partiallyContact);

module.exports = { contactsRouter: router };
