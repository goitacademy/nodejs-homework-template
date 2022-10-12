const express = require("express");

const router = express.Router();
const Joi = require("joi");

const contactsAPI = require("../../models/contacts");

const schemaNewContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.number().integer().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().integer(),
});

router.get("/", async (req, res, next) => {
  const result = await contactsAPI.listContacts();
  res.status(200).json(result);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contactsAPI.getContactById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(result);
});

router.post("/", async (req, res, next) => {
  const newContact = req.body;
  const { error } = schemaNewContact.validate(newContact);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const result = await contactsAPI.addContact(newContact);
  console.log(newContact);
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contactsAPI.removeContact(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const newContact = req.body;
  const id = req.params.contactId;
  const { error } = schemaUpdateContact.validate(newContact);
  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const result = await contactsAPI.updateContact(id, newContact);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(result);
});

module.exports = router;
