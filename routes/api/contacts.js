const express = require("express");
const router = express.Router();
const {
  addContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");

router.get("/", listContacts);

router.get("/:contactId", getById);

router.post("/", addContactValidation, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", addContactValidation, updateContact);

module.exports = router;
