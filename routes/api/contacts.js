const express = require("express");

const router = express.Router();

const isValidId = require("../../middlewares/isValidId");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
