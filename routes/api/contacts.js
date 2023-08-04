const express = require("express");

const contacts = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(result);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ message: "missing required name field" });
  }
  if (!email) {
    return res.status(400).json({ message: "missing required email field" });
  }
  if (!phone) {
    return res.status(400).json({ message: "missing required phone field" });
  }

  const newContact = await contacts.addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params;
  const removedContact = await contacts.removeContact(id);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params;
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "missing fields" });
  }
  console.log(req.body);
  const updatedContact = await contacts.updateContact(id, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(updatedContact);
});

module.exports = router;
