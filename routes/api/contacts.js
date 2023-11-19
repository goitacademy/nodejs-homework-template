const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const Joi = require("joi");

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(data);
};

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = validateContact.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newContact = { ...req.body, id: shortid.generate() };
  const createdContact = await addContact(newContact);
  res.status(201).json(createdContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (result) {
    res.status(200).json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = validateContact.validate(req.body);
  const { contactId } = req.params;

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = await updateContact(contactId, req.body);

  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;

// фіксю баги
