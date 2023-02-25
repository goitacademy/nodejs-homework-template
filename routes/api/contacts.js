const express = require("express");
const createError = require("http-errors");
const fs = require("fs/promises");
const path = require("path");

const { randomUUID } = require("crypto");
const contactsOperation = require("../../models/contacts");

const contactsPath = path.join(__dirname, "../../models/contacts.json");

const Joi = require("joi");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(6).max(12).required(),
});

const writeContact = async (contacts) => {
  return await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperation.listContacts();
    res.status(200).json(contacts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    console.log(id);
    const contacts = await contactsOperation.listContacts();
    const contact = await contacts.find((contact) => contact.id === id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }
    res.status(200).json(contact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = schema.validate(body);
    console.log(body);
    if (error) {
      throw createError(400, "one of the fields missed(name, email, phone");
    }
    const contacts = await contactsOperation.listContacts();

    const newContact = { id: randomUUID(), ...body };
    contacts.push(newContact);

    await writeContact(contacts);

    res.status(201).json({ newContact });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contacts = await contactsOperation.listContacts();

    const filtredContacts = contacts.filter((contact) => contact.id !== id);
    if (filtredContacts.length === contacts.length) {
      return res.status(404).json({ message: "contact not found" });
    }

    await writeContact(filtredContacts);

    res.status(200).json({ message: " contact was deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contacts = await contactsOperation.listContacts();

    const contact = await contacts.find((contact) => contact.id === id);
    if (!contact) {
      return res.status(404).json({ message: "contact not found" });
    }
    const body = req.body;
    const { error } = schema.validate(body);
    console.log(body);
    if (error) {
      throw createError(400, "one of the fields missed(name, email, phone");
    }

    const { name, email, phone } = contact;

    const updatedContact = {
      name,
      email,
      phone,
    };

    res.status(200).json(updatedContact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
