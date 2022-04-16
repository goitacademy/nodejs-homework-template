const express = require("express");

const contacts = require("../../models/contacts.json");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const [contact] = contacts.filter((item) => item.id === req.params.contactId);
  res.status(200).json({ contact });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  res.status(201).json({ newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const fileteredContacts = contacts.filter(
    (item) => item.id !== req.params.contactId
  );
  res.status(200).json({ message: "contact deleted", fileteredContacts });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  let updatedContact = null;
  contacts.forEach((contact) => {
    if (contact.id === req.params.contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      updatedContact = contact;
    }
  });
  res.status(200).json({ updatedContact });
});

module.exports = router;
