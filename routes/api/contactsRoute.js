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

const guard = require("../../helpers/guard");

router.get("/", guard, getAllContactsControler);
router.get("/:contactId", guard, getContactByIdControler);
router.post("/", guard, validateCreateContact, createContactControler);
router.delete("/:contactId", guard, removeContactControler);
router.patch(
  "/:contactId",
  guard,
  validateUpdateContact,
  updateContactControler
);

module.exports = router;
