const express = require("express");

const {
  getContacts,
  getContactId,
  deleteContact,
  addNewContact,
  updtContact,
} = require("../../src/controllers/contactsControllers");

const {
  addContactValidation,
  updateContactValidation,
} = require("../../src/middlewares/validationMiddelwares");

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getContactId);

router.post("/", addContactValidation, addNewContact);

router.put("/:contactId", updateContactValidation, updtContact);

router.delete("/:contactId", deleteContact);

module.exports = router;
