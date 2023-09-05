const express = require("express");

const contacts = require("../../models/contacts.js");

const router = express.Router();

const contactSchema = require("../../service/schemas/task.js");

router.get("/", async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
});

router.get("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await contacts.getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const removed = await contacts.removeContact(contactId);
  if (removed) {
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  const contactId = req.params.contactId;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const updatedContact = await contacts.updateContact(contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (!body || !body.favorite) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await contacts.updateStatusContact(contactId, body);

    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "Not found") {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
