const express = require("express");
const router = express.Router();
const contacts = require("../../models/contacts.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { createContactSchema, updateContactSchema } = require("./validators");

router.get("/", (req, res) => {
  res.json(contacts);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", (req, res) => {
  const { name, email, phone } = req.body;
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    updateContactsFile();
    res.status(201).json(newContact);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((c) => c.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    updateContactsFile();
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const contact = contacts.find((c) => c.id === id);
    if (contact) {
      if (name) contact.name = name;
      if (email) contact.email = email;
      if (phone) contact.phone = phone;
      updateContactsFile();
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

function updateContactsFile() {
  fs.writeFileSync("contacts.json", JSON.stringify(contacts));
}

module.exports = router;
