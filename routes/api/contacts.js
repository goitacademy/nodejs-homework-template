const express = require("express");
const router = express.Router();
const { listContacts, getContactById, removeContact, addContact, updateContact } = require("../../models/contacts");

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.json(contact);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newContact = await addContact({ name, email, phone });
  if (newContact) {
    return res.status(201).json(newContact);
  } else {
    return res.status(500).json({ message: "Error adding a contact" });
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const removed = await removeContact(contactId);
  if (removed) {
    return res.json({ message: "Contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const updatedContacts = await updateContact(contactId, { name, email, phone });
  if (updatedContacts) {
    return res.json(updatedContacts);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
