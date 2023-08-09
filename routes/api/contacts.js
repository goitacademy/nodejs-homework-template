const express = require("express");
const { nanoid } = require("nanoid/non-secure");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const schemaPost = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.string()
    .pattern(/^(?:\+38)?0\d{9}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "any.required": "Phone number is required",
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const schemaPut = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  phone: Joi.string()
    .pattern(/^(?:\+38)?0\d{9}$/)
    .messages({
      "string.pattern.base": "Invalid phone number format",
      "any.required": "Phone number is required",
    }),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const validatePostData = (req, res, next) => {
  const { error } = schemaPost.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const validatePutData = (req, res, next) => {
  const { error } = schemaPut.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

const router = express.Router();

const getContact = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    req.contact = contact;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", getContact, (req, res) => {
  res.status(200).json(req.contact);
});

router.post("/", validatePostData, async (req, res) => {
  const { name, email, phone } = req.body;
  const id = nanoid();
  const newContact = { id, name, email, phone };

  try {
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:contactId", getContact, async (req, res) => {
  const removedContact = await removeContact(req.contact.id);
  if (!removedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:contactId", validatePutData, getContact, async (req, res) => {
  const updatedContact = await updateContact(req.contact.id, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.status(200).json(updatedContact);
});

module.exports = router;
