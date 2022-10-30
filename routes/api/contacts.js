const express = require("express");
const Joi = require("joi");
const contactsModule = require("../../models/contacts");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

//  ----Get contacts

router.get("/", async (req, res) => {
  try {
    const contacts = await contactsModule.listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  ----Get contacts by id

router.get("/:contactId", async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsModule.getContactById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact does not found" });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  ----Add contact

router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const newContact = await contactsModule.addContact({ name, email, phone });

    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  ----Remove contact

router.delete("/:contactId", async (req, res) => {
  try {
    const id = req.params.contactId;
    const contacts = await contactsModule.listContacts();
    const contactEl = contacts.find((el) => String(el.id) === id);
    if (!contactEl) {
      res.status(404).json({ message: "Not found" });
      return null;
    }
    await contactsModule.removeContact(id);

    res.status(200).json({ message: `Contact with id: ${id} was removed` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  ----Update contact

router.put("/:contactId", async (req, res) => {
  try {
    const id = req.params.contactId;
    const body = req.body;
    const contacts = await contactsModule.listContacts();
    const index = contacts.findIndex((item) => String(item.id) === id);

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    if (index === -1) {
      return res.status(404).json({ error: "Contact does not found" });
    }

    const updateContact = await contactsModule.updateContact(id, body, index);

    res.status(200).json(updateContact);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
