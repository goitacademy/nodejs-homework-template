const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await contacts.getContactById(contactId);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name === "" || email === "" || phone === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await contacts.removeContact(contactId);
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await contacts.updateContact(contactId, req.body);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
