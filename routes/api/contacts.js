const express = require('express');
const { nanoid } = require("nanoid");
const router = express.Router()
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const db = await listContacts();
  return res.status(200).send(db);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.status(200).send(contact);
  }
  return res.status(404).json({ message: "Not Found" });
})

router.post('/', async (req, res, next) => {
  const contactId = nanoid();
  const { name, email, phone } = req.body;

  const { error, value } = schema.validate({
    name,
    email,
    phone,
  });

  if (error) {
    console.log("res : ", error, value);
    return res.status(400).json({ message: "missing name field"})
  }
  const newContact = {
    contactId,
    name,
    email,
    phone,
  }
  addContact(newContact);
  return res.status(201).send(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(204).json({ message: "deleted contact" });
})

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error, value } = schema.validate({
    name,
    email,
    phone
  });

  if (error) {
    console.log("res : ", error, value);
    return res.status(400).json({ message: "error fields"})
  }

  const body = {
    name,
    email,
    phone
  }

  const newContact = await updateContact(contactId, body);

  if (newContact) {
    return res.status(201).send(newContact);
  }
  return res.status(404).json({ message: "Not found"})
});

module.exports = router;
