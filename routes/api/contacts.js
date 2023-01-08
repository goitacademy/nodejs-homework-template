const express = require("express");
const {
  getContacts,
  createContact,
  deleteContact,
  changeContacts,
  contactById,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", contactById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", changeContacts);

module.exports = router;