const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email(),
  phone: Joi.string().alphanum().min(9).max(13).required(),
});

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res
      .status(404)
      .json({ message: "I am sorry! We don`t have contact with this id :( " });
  }
});

router.post("/", async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required field" });
  }
  const { name, email, phone } = value;
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res) => {
  const newContacts = await removeContact(req.params.contactId);

  if (!newContacts) {
    res
      .status(404)
      .json({ message: "I am sorry! We don`t have contact with this id :( " });
  } else {
    res.status(200).json({ message: "Contact deleted!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing required field" });
  }

  const { name, email, phone } = value;

  const updatedContact = await updateContact(
    req.params.contactId,
    name,
    email,
    phone
  );
  if (!updatedContact) {
    res
      .status(404)
      .json({ message: "I am sorry! We don`t have contact with this id :( " });
  } else {
    res.status(200).json(updatedContact);
  }
});

module.exports = router;
