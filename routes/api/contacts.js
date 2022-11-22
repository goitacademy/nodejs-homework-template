const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  postValidationSchema,
  updateValidationSchema,
} = require("../../middleware/validationContacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", postValidationSchema, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateValidationSchema, updateContact);

module.exports = router;
