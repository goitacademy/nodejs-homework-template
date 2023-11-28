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

const jsonParser = express.json();

console.log("1 - routes api contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", jsonParser, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", jsonParser, updateContact);

router.patch("/:contactId/favorite", jsonParser, favoriteContact);

router.patch("/:contactId", jsonParser, partiallyContact);

module.exports = { contactsRouter: router };
