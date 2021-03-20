const express = require("express");
const router = express.Router();

const {
  getAllContactsControler,
  getContactByIdControler,
  createContactControler,
  removeContactControler,
  updateContactControler,
} = require("../../controlers/contactsControlers");

const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contactsValidation");

router.get("/", getAllContactsControler);
router.get("/:contactId", getContactByIdControler);
router.post("/", validateCreateContact, createContactControler);
router.delete("/:contactId", removeContactControler);
router.patch("/:contactId", validateUpdateContact, updateContactControler);

module.exports = router;
