const express = require('express');
const Joi = require('joi');
const fs = require('fs');

const router = express.Router();

const contacts = require('../../models/contacts.json');


const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
});

function validateContactData(req, res, next) {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}


function saveContactsToFile() {
  fs.writeFileSync(
    './models/contacts.json',
    JSON.stringify(contacts, null, 2),
    'utf8'
  );
}

router.get('/', async (req, res, next) => {
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = contacts.find(contact => contact.id === contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', validateContactData, async (req, res, next) => {
  const newContact = {
    id: Date.now().toString(),
    ...req.body
  };
  contacts.push(newContact);
  saveContactsToFile();
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index !== -1) {
    contacts.splice(index, 1);
    saveContactsToFile();
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', validateContactData, async (req, res, next) => {
  const { contactId } = req.params;
  const index = contacts.findIndex(contact => contact.id === contactId);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...req.body };
    saveContactsToFile();
    res.json(contacts[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
