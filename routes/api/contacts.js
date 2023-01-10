const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contact.controller");

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", addContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);

module.exports = router;
