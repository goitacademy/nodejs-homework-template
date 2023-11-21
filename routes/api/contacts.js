const express = require("express");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  data ? res.json(data) : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const error = schema.validate(req.body);
  if (error.error) res.status(400).json(error.error.details[0].message);
  else {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await removeContact(contactId);
  removedContact
    ? res.status(200).json({ message: "Contact removed" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  if (!req.body) res.status(400).json({ message: "missing fields" });
  else {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    updatedContact
      ? res.json(updatedContact)
      : res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
