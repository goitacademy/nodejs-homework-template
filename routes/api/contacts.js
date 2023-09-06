const express = require("express");
const validateData = require("../../middlewares/validateData");
const {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
} = require("../../controllers/contacts.js");
const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateData, addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateData, updateContact);

module.exports = router;