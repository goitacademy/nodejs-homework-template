const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  patchContactValidation,
} = require("../../middleware/validationMiddleware");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContsct,
  changeContact,
  patchContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", deleteContsct);
router.put("/:contactId", addContactValidation, changeContact);
router.patch("/:contactId", patchContactValidation, patchContact);

module.exports = router;
