const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts")

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:id", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const contact = await addContact(newContact);
  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (result) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = req.body;
  const contact = await updateContact(contactId, updatedContact);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "missing fields" });
  }
});

module.exports = router
