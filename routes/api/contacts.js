const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contactsController");



router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);

module.exports = router;
