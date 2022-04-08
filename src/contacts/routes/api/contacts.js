const express = require("express");
const { authorize } = require("../../../middlewares/authorize.middleware");
const {
  addContactValid,
  validatePatch,
  validatePut,
} = require("../../../middlewares/validator");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../service/contacts");

const router = express.Router();

router.get("/", authorize(), listContacts);
router.get("/:contactId",authorize(), getContactById);
router.post("/", authorize(), addContactValid, addContact);
router.delete("/:contactId",authorize(), removeContact);
router.put("/:contactId", authorize(),validatePut, updateContact);
router.patch("/:contactId",authorize(), validatePatch, updateStatusContact);

module.exports = router;
