const express = require("express");
const crypto = require("node:crypto");

const contactSchema = require("../../validation/contacts");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  const response = contactSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }
  const { name, email, phone } = req.body;

  const contactToAdd = { id: crypto.randomUUID(), name, email, phone };

  try {
    const contact = await addContact(contactToAdd);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = removeContact(contactId);

    if (contact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const response = contactSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  try {
    const updatedContact = await updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (updatedContact) {
      return res.status(200).json(updatedContact);
    }
  } catch (error) {
    return res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
