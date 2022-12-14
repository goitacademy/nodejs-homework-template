const express = require("express");

const uuid = require("uuid");
const Joi = require("joi");

const router = express.Router();
const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),

  email: Joi.string().required(),

  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const all = await contacts.listContacts();
  res.json(all);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(contactById);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    const contactWithId = await { id: uuid.v4(), ...req.body };
    const postedContact = await contacts.addContact(contactWithId);
    res.status(201).json(postedContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
  }
  else {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(updatedContact);
    }
  }
});

module.exports = router;
