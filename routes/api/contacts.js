const express = require("express");
const createError = require("http-errors");
const contactsOperation = require("../../models/contacts");

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
    const contact = await contactsOperation.getContactById(id);
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
    if (error) {
      throw createError(400, "one of the fields missed(name, email, phone");
    }

    const addedContact = await contactsOperation.addContact(body);

    res.status(201).json(addedContact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const result = await contactsOperation.removeContact(id);

    return result
      ? res.status(200).json({ message: " contact was deleted" })
      : res.status(404).json({ message: "contact not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const body = req.body;

    const { error } = schema.validate(body);
    console.log(body);
    if (error) {
      throw createError(400, "one of the fields missed(name, email, phone");
    }

    const result = await contactsOperation.updateContact(id, body);

    return result
      ? res.status(200).json(result)
      : res.status(404).json({ message: "contact not found" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
