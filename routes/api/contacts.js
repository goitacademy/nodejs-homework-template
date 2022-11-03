const express = require("express");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("/nodejs-homework-template-vm/models/contacts");
router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: "success", code: 200, contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);
  if (!contactById) {
    res.status(400).json({ message: "not found", code: 400 });
  }
  res.status(200).json({ message: "success", code: 200, contactById });
});

router.post("/", async (req, res, next) => {
  const scema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(7).max(20).required(),
  });
  const validateContact = scema.validate(req.body);
  if (validateContact.error) {
    return res.status(400).json({ message: validateContact.error, code: 400 });
  }
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);
  res.status(201).json({ message: "contact added", contact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await removeContact(contactId);
  res.status(201).json({ message: "contact deleted", contacts });
});

router.put("/:contactId", async (req, res, next) => {
  const scema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(7).max(20).required(),
  });
  const validateContact = scema.validate(req.body);
  if (validateContact.error) {
    return res.status(400).json({ message: validateContact.error, code: 400 });
  }
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contactByUpdate = await updateContact(contactId, name, email, phone);
  res.status(201).json({ message: "contact deleted", contactByUpdate });
});

module.exports = router;
