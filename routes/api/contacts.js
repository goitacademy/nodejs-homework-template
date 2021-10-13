const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contacts");
const {
  validateContact,
  validateUpdateContact,
  validateId,
} = require("./validation");

router.get("/", getContacts);

router.get("/:id", validateId, getContact);

router.post("/", validateContact, addContact);

router.delete("/:id", validateId, removeContact);

router.put("/:id", validateId, validateUpdateContact, updateContact);

module.exports = router;
