const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../controllers/contactsController");

const {
  contactValidation,
  updateContactValidation,
} = require("../../middlewares/validation");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", contactValidation, addContact);
router.delete("/:contactId", updateContactValidation, removeContact);
router.put("/:contactId", updateContact);

module.exports = router;
