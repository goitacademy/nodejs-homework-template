// routes/api/contacts.js

const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContactById,
  deleteContact,
} = require("../../Controllers/contactsController");

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);
router.put("/:contactId", updateContactById);
router.delete("/:contactId", deleteContact);

module.exports = router;
