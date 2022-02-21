const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactsById,
  addContacts,
  deleteContacts,
  patchContact,
} = require("../../controllers/contacts");

const {
  createContactValidation,
  updateContactValidation,
} = require("../../middlewares/validation");

router.get("/", getContacts);
router.get("/:contactId", getContactsById);
router.post("/", createContactValidation, addContacts);
router.delete("/:contactId", deleteContacts);
router.put("/:contactId", updateContactValidation, patchContact);

module.exports = router;
