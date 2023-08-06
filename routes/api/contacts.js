// const Joi = require("joi");
const { schema } = require("../../models/schema.js");

const { 
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const validation = schema.validate(contact);
  if (validation.error) {
    const reqFields = [];
    Object.keys(validation.error._original).forEach(key => {
      if (!validation.error._original[key]) {
        reqFields.push(`${key} - field`);
      }
    });
    const msg = `missing required ${reqFields.join(", ")}`;
    res.status(400).json({ message: msg });
  } else {
    const newContact = await addContact(contact);
    res.json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactDeleted = await removeContact(req.params.contactId);
  if (contactDeleted) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const validation = schema.validate(contact);
  if (validation.error) {
    const reqFields = [];
    Object.keys(validation.error._original).forEach(key => {
      if (!validation.error._original[key]) {
        reqFields.push(`${key} - field`);
      }
    });
    const msg = `missing required ${reqFields.join(", ")}`;
    res.status(400).json({ message: msg });
  } else {
    const contactUpdated = await updateContact(req.params.contactId, contact);
    if (contactUpdated) {
      res.json(contactUpdated);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  }
});

module.exports = router;