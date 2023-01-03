const express = require("express");
const models = require("../../models/contacts");
const { HttpError } = require("../../models/helpers");
const Joi = require("joi");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await models.listContacts();
  if (!contacts) next(HttpError(404, "Something wrong"));
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await models.getContactById(contactId);
  if (!contact) next(HttpError(404, "Contact not found"));
  return res.json(contact);
});

router.post("/", async (req, res, next) => {
  const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 3,
      })
      .required(),
    phone: Joi.string().min(10).max(13).required(),
  });
  const { error } = contactsSchema.validate(req.body);
  if (error)
    next(HttpError(400, "missing required name field or filled incorectly"));
  const { name, email, phone } = req.body;
  const newContact = await models.addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  await models.removeContact(id);
  if (!id) next(HttpError(400, "Not found"));
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(20),
    email: Joi.string().email({
      minDomainSegments: 3,
    }),
    phone: Joi.string().min(10).max(13),
  });
  const { error } = contactsSchema.validate(req.body);
  if (error) next(HttpError(400, "missing fields or filled incorrectly"));
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await models.updateContact(id, {
    name,
    email,
    phone,
  });
  return res.status(200).json(updatedContact);
});

module.exports = router;
