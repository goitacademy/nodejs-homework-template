const express = require("express");
const Joi = require("joi");

const api = require("../../models/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await api.listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await api.getContactById(req.params.contactId);

  if (contact) res.status(200).json(contact);
  res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) res.status(404).json({ message: "missing required name field" });

  const newContact = await api.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    await api.removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) res.status(400).json({ message: "missing fields" });

  try {
    const updatedContact = await api.updateContact(
      req.params.contactId,
      req.body
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
