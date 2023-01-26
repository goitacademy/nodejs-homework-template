const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uk"] },
      })
      .required(),
    phone: Joi.string()
      .length(14)
      .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/)
      .required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const { name, email, phone } = req.body;
  const newContact = { id: uuidv4(), name, email, phone };
  const response = await addContact(newContact);
  res.status(201).json(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = removeContact(id);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
      .min(3)
      .max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk"] },
    }),
    phone: Joi.string()
      .length(14)
      .pattern(/^(.)+[0-9]+(.)+\s+[0-9]+(.)+[0-9]$/),
  });

  const { id } = req.params;
  const { body } = req;

  if (Object.keys(body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const validationResult = schema.validate(body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const response = await updateContact(id, body);
  if (!response) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(response);
});

module.exports = { contactsRouter: router };
