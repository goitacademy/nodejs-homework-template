const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { addValidation } = require("../../middlewares/validationMiddleware");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", addValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", addValidation, updateContact);

module.exports = router;
