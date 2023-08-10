const express = require("express");
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("../../validator/validator");
const { HttpError } = require("../../Error/Error");
const { listContacts } = require("../../models/contacts");
const { getContactById } = require("../../models/contacts");
const { removeContact } = require("../../models/contacts");
const { addContact } = require("../../models/contacts");
const { updateContact } = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(contact);
});

router.post("/", async (req, res) => {
  const { error, value } = schemaCreateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { name, email, phone } = value;
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { error, value } = schemaUpdateContact.validate(req.body);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { name = null, email = null, phone = null } = value;
  const updatedContact = await updateContact(contactId, name, email, phone);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
});

module.exports = router;
