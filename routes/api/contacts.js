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
router.get("/:contactId", getCurrent, getById);
router.post("/", getCurrent, addContact);
router.delete("/:contactId", getCurrent, removeContact);
router.put("/:contactId", getCurrent, updateContact);
router.patch("/:contactId/favorite", getCurrent, updateStatusContact);

module.exports = { contactsRouter: router };
