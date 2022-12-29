const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

}).min(1);

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return res.status(404).json({ message: "not found" });
  }
  res.json(data);
});

router.post("/", async (req, res, next) => {
  const { name, phone, email } = req.body;
  const { error } = schema.validate(req.body);
  
  if (!!error) {
    return res.status(400).json({ message: "missing field" });
  }
  const data = await addContact(name, phone, email);

  res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (!contactId) {
    return res.status(404).json({ message: "not found" });
  }
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = schemaUpdate.validate(req.body);
  if (!!error) {
    return res.status(400).json({ message: "missing field" });
  }
  const data = await updateContact(contactId, req.body)
  
  if (!data) {
    return res.status(404).json({ message: "not found" });
  }
  res.json(data);
});

module.exports = router;
