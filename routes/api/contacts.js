const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const list = await listContacts();
  res.json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const body = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().min(7).max(15).required(),
  });
  const validationResult = schema.validate(body);
  if (validationResult.error) {
    res.status(400).json({ message: "missing required name field" });
    return;
  }

  const contact = await addContact(body);
  res.status(201).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    const ok = await removeContact(id);
    if (ok) {
      res.json({ message: "contact deleted" });
      return;
    }
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const schema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email({ minDomainSegments: 2 }).optional(),
    phone: Joi.string().min(7).max(15).optional(),
  });
  const validationResult = schema.validate(body);
  if (validationResult.error) {
    res.status(400).json({ message: "invalid value content" });
    return;
  }

  const contact = await updateContact(id, body);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
