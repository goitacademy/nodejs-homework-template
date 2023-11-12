const express = require("express");

const {
  contactValidation,
} = require("../../validation/contactsValidation");
const {
  getById,
  getAll,
  createContact,
  // updateContact,
  // removeContact,
} = require("../../controllers/contact");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", contactValidation, createContact);

// router.delete("/:contactId", removeContact);

// router.put("/:contactId", contactValidation, updateContact);

// router.patch("/:contactId", contactValidation, updateContact);

module.exports = router;
