const express = require("express");

const Joi = require("joi");

const contactsApi = require("../../api/contacts/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
}).or("name", "phone", "email");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await contactsApi.listContacts();
    res.send(allContacts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const idContact = req.params.contactId;

  try {
    const conntactsById = await contactsApi.getContactById(idContact);
    if (!conntactsById) {
      res.status(404).json({ message: "Not found" });
    }
    res.send(conntactsById);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
  }

  try {
    const { name, email, phone } = req.body;
    const newContact = await contactsApi.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const idContact = req.params.contactId;
  try {
    const deleteContact = await contactsApi.removeContact(idContact);
    if (!deleteContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
  }

  try {
    const idContact = req.params.contactId;
    const updatedContact = await contactsApi.updateContact(idContact, req.body);
    if (updatedContact === null) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
