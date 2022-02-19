const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const {
  validatePostCont,
  validateUpdCont,
} = require("../../middleware/validation");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validatePostCont, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateUpdCont, updateContact);

module.exports = router;
