const express = require("express");
const { contactValidation } = require("../../middleware/validationMiddleware");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", contactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", contactValidation, updateContact);
router.patch("/:contactId/favorite", contactValidation, updateStatusContact);

module.exports = router;
