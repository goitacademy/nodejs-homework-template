const express = require("express");
// const joi = require("joi");
// const { HttpError } = require("../../helpers/index");
const router = express.Router();
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../../models/contacts");
// const contactSchema = require("./../../validation/index");

const {
  getAllContacts,
  getSingleContact,
  addNewContact,
  deleteContact,
  setContact,
} = require("./../../controllers/contacts");

// Get all

router.get("/", getAllContacts);

// Get contact

router.get("/:contactId", getSingleContact);

// Create new contact

router.post("/", addNewContact);

// Delete contact

router.delete("/:contactId", deleteContact);

// Update contact

router.put("/:contactId", setContact);

module.exports = router;
