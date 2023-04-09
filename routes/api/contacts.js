const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts");

const {
  addContactsValidation,
  updateContactsValidation,
} = require("../../middlewares/validateData");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContactsValidation, addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContactsValidation, updateContact);

module.exports = router;
