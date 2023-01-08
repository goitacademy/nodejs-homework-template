const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^\(\d\d\d\) \d\d\d-\d\d\d\d$/)
      .required(),
  });

  if (schema.validate(req.body).error) {
    res.status(400).json({ message: schema.validate(req.body).error.message });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const isRemoved = await removeContact(req.params.contactId);
  if (isRemoved) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .optional(),
    phone: Joi.string()
      .pattern(/^\(\d\d\d\) \d\d\d-\d\d\d\d$/)
      .optional(),
  });

  if (schema.validate(req.body).error) {
    res.status(400).json({ message: schema.validate(req.body).error.message });
  } else if (req.body.name || req.body.email || req.body.phone) {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    res.status(200).json(updatedContact);
  } else {
    res.status(400).json({ message: "missing fields" });
  }
});

module.exports = router;
