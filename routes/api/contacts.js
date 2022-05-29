const express = require("express");
const { contacts } = require("../../controllers");
const router = express.Router();
const validateSchema = require("../../validation");
const contactSchema = require("../../schemas/contacts");

router.get("/", contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", validateSchema(contactSchema), contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.put(
  "/:contactId",
  validateSchema(contactSchema),
  contacts.updateContact
);

module.exports = router;
