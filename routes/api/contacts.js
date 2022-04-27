const express = require("express");

const router = express.Router();

const {
  addContactValidation,
} = require("../../middleware/validationMiddleware");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContsct,
  changeContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", deleteContsct);
router.put("/:contactId", addContactValidation, changeContact);

module.exports = router;
