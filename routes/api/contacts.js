const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
  updateStatusContact,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", editContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
