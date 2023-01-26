const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addContactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", addContactValidation, updateContact);

module.exports = router;
