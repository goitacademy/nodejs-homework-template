const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const tasks = require('../../models/contacts');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
});

const schemaSecond = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string(),
});

router.get('/', async (req, res, next) => {
  const contacts = await tasks.listContacts();

  res.status(200).json({ contacts, itemCount: contacts.length });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await tasks.getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json(contact);
  }
});

router.post('/', async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }

  const { name, email, phone } = req.body;
  const newContact = await tasks.addContact({ name, email, phone });

  if (!newContact) {
    res.status(400).json({ message: 'Contact already exist' });
  } else {
    res.status(201).json(newContact);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const isDeleted = await tasks.removeContact(contactId);

  if (!isDeleted) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json({ message: 'Contact deleted' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const result = schemaSecond.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }

  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const contactToUpdate = await tasks.updateContact(contactId, { name, email, phone });

  if (!contactToUpdate) {
    res.status(404).json({ message: 'Not found' });
  } else {
    res.status(200).json(contactToUpdate);
  }
});

module.exports = router;
