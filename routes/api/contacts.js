const express = require("express");

const router = express.Router();

const { isValidId, doesContactExist } = require("../../middlewares");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsCtrl");

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", doesContactExist, addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
