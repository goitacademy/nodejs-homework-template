const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ message: "Contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation error", details: error.details });
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(updatedContact);
});

module.exports = router;