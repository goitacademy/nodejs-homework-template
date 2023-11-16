const express = require("express");

import { listContacts } from "../../models/controllers/contacts/listContacts";
import { getContactById } from "../../models/controllers/contacts/getContacts";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.status(200).json(contact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
    const { name, email, phone } = req.body;
    if (!name) {
      res.status(400).json({ message: "missing required name - field" });
    } else if (!email) {
      res.status(400).json({ message: "missing required email - field" });
    } else if (!phone) {
      res.status(400).json({ message: "missing required phone - field" });
    } else {
      const newContact = await addContact(req.body);
      res.status(201).json(newContact);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
    const { contactId } = req.params;
    const removed = await removeContact(contactId);

    if (removed) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: "template message" });
    const { contactId } = req.params;
    const body = req.body;
    const updated = await updateContact(contactId, body);

    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
