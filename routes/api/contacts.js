const express = require("express");
const router = express.Router();

const { getCurrent } = require("../../middlewares");
const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");

router.get("/", getCurrent, listContacts);
router.get("/:contactId", getById);
router.post("/", getCurrent, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = { contactsRouter: router };
