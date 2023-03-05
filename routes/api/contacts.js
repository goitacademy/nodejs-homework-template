const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const users = await listContacts();

  res.status(200).json(users.body);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact.body);
});
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

router.post("/", async (req, res, next) => {
  const { value, error } = createContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const newContact = await addContact(value);
  res.status(201).json(newContact.body);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const message = await removeContact(contactId);
  if (message.type === "error") {
    res.status(404).json({ message: message.body });
    return;
  }
  res.status(200).json({ message: message.body });
});

router.put("/:contactId", async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  if (!body.phone && !body.name && !body.mail) {
    res.status(400).json({ message: "missing fields" });
  }
  const result = await updateContact(contactId, body);
  if (result.type === "error") {
    return res.status(404).json({ message: result.body });
  }
  res.status(200).json(result.body);
});

module.exports = router;
