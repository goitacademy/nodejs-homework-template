const express = require("express");

const crypto = require("node:crypto");

const contactSchema = require("../../validation/contacts");

const ContactControllers = require("../../controllers/contacts");

const router = express.Router();

const jsonParser = express.json();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contact");

router.get("/", ContactControllers.getContacts);

router.get("/:contactId", ContactControllers.getContact);

router.post("/", jsonParser, ContactControllers.createContact);

router.delete("/:contactId", ContactControllers.deleteContact);

router.put("/:contactId", jsonParser, ContactControllers.updateContact);

router.patch(
  "/:contactId/favorite",
  jsonParser,
  ContactControllers.updateStatusContact
);

module.exports = router;
