const express = require('express');
const Joi = require('joi');

const router = express.Router();

const contacts = [];

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = contacts.find((c) => c.id === contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = {
      id: generateUniqueId(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { name, email, phone } = req.body;
    const { error } = contactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const index = contacts.findIndex((c) => c.id === contactId);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], name, email, phone };
      res.json(contacts[index]);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


function generateUniqueId() {
  return Math.floor(Math.random() * Date.now()).toString();
}

module.exports = router;
