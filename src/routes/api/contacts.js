const express = require("express");
const {
  addContactValid,
  validatePatch,
  validatePut,
} = require("../../middlewares/validator");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/contacts");

const router = express.Router();

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", addContactValid, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", validatePut, updateContact);
router.patch("/:contactId", validatePatch, updateStatusContact);

module.exports = router;
