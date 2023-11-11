const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");
const {
  newContacts,
  editContacts,
  favoriteSchema,
} = require("../../models/validation");
const {
  validContact,
  validUpdateContact,
} = require("../../helpers/validWrapper")
const ctrlWrapper = require("../../helpers/ctrlWrapper ")
const router = express.Router();

router.get("/", ctrlWrapper(getAllContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validContact(newContacts),ctrlWrapper(addContact));

router.delete("/:contactId", ctrlWrapper(removeContact));

router.put("/:contactId", validUpdateContact(editContacts),ctrlWrapper(updateContact));

router.patch("/:contactId/favorite", validContact(favoriteSchema),ctrlWrapper(updateStatusContact));

module.exports = router;