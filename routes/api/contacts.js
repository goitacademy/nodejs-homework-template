const express = require("express");

const uuid = require("uuid");

const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const all = await contacts.listContacts();
  res.json(all);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(contactById);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const contactWithId = await { id: uuid.v4(), ...req.body };
    const postedContact = await contacts.addContact(contactWithId);
    res.status(201).json(postedContact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  } else {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    }
    else { res.json(updatedContact) };
  }
});

module.exports = router;
