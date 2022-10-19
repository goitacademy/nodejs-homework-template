const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactValidation,
} = require("../../midlewares/validationMidlewares");

router.get("/", listContacts);

router.get("/:id", getContactById);

router.post("/", addContactValidation, addContact);

router.delete("/:id", removeContact);

router.put("/:id", updateContact);

module.exports = router;
