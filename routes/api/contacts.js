const express = require("express");
const {
  getContacts,
  getContact,
  editContact,
  deleteContact,
  createContact,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", editContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", createContact);

module.exports = router;
