const express = require("express");
const router = express.Router();
const {
  postValidate,
  patchPutValidate,
} = require("./../../middlewares/contactsValidation.js");
const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../../controllers/contactsControllers");

router.get("/", getContacts);

router.get("/:contactId", getContactById);

router.post("/", postValidate, addContact);

router.delete("/:contactId", removeContact);

router.patch("/:contactId", patchPutValidate, updateContact);

module.exports = router;
