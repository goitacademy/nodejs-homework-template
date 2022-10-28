const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.json(contact);
    return;
  }
  res
    .status(404)
    .json({ message: `Contact with id: ${req.params.contactId} not found` });
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string()
      // .pattern(
      //   /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      // )
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    const { message } = validationResult.error.details[0];
    return res.status(400).json({ message: `Error field: ${message}` });
  }
  const addedContact = await addContact(req.body);
  res.status(201).json(addedContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact) {
    res.json({
      message: "contact deleted",
      contact: removedContact,
    });
    return;
  }
  res
    .status(404)
    .json({ message: `Contact with id: ${req.params.contactId} not found` });
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string()
      // .pattern(
      //   /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
      // )
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    const { message } = validationResult.error.details[0];
    return res.status(400).json({ message: `Error field: ${message}` });
  }
  const updatedContact = await updateContact(req.params.contactId, req.body);
  res.json(updatedContact);
});

module.exports = router;
