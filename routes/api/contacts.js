const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const Joi = require("joi");
const express = require("express");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = await contactSchema.validateAsync(req.body);
    const contact = await addContact(value);
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: "missing required field", err });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const value = await contactSchema.validateAsync(req.body);
    const contact = await updateContact(contactId, value);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    res.status(400).json({ message: "missing required fields", err });
  }
});

module.exports = router;
