const express = require("express");
const router = express.Router();
const contactsController = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const contacts = contactsController.listContacts();
  res.status(200).json(contacts);
  console.log(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await contactsController.getById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found." });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(404).json({ message: "Missing required fields." });
    return;
  }
  const newContact = contactsController.addContact({ name, email, phone });
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = contactsController.remoweContact(contactId);
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    res.status(404).json({ message: "missing fields" });
    return;
  }
  const updatedContact = contactsController.updateContacts(contactId, {
    name,
    email,
    phone,
  });
  if (updatedContact) {
    res.status(200).json(updatedContact);
  }
});

module.exports = router;
