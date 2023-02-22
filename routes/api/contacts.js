const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  contactPostValidator,
  contactPutValidator,
} = require("../../models/validator.js/validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.status(200).json(contact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactPostValidator(req.body);
  if (error) return res.status(400).json({ message: "name missing" });
  const newContact = await addContact(req.body);
  if (newContact) return res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (deletedContact) {
    return res.status(204).json({ message: "Contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = contactPutValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "forms are not filled in" });
  }
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body);
  if (updatedContact) {
    return res.status(200).json(updatedContact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = { contactsRouter: router };
