const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const contactsPath = path.join(__dirname, '../../models/contacts.json');

const readContactsFile = () => {
  try {
    const fileData = fs.readFileSync(contactsPath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const writeContactsFile = (data) => {
  try {
    fs.writeFileSync(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const validateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

const notFoundMessage = { message: 'Not found' };

router.get('/', async (req, res, next) => {
  try {
    const contacts = readContactsFile();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = readContactsFile();
  const contact = contacts.find((c) => c.id === contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json(notFoundMessage);
  }
});

router.post('/', validateContact, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = readContactsFile();

  if (!name) {
    return res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  contacts.unshift(newContact);
  writeContactsFile(contacts);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = readContactsFile();
  const removedIndex = contacts.findIndex((c) => c.id === contactId);

  if (removedIndex !== -1) {
    const removedContact = contacts.splice(removedIndex, 1);
    writeContactsFile(contacts);
    res.json({ message: 'Contact deleted', contact: removedContact[0] });
  } else {
    res.status(404).json(notFoundMessage);
  }
});

router.put('/:contactId', validateContact, async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = { ...req.body, id: contactId };
  const contacts = readContactsFile();
  const updatedIndex = contacts.findIndex((c) => c.id === contactId);

  if (updatedIndex !== -1) {
    contacts[updatedIndex] = updatedContact;
    writeContactsFile(contacts);
    res.json(updatedContact);
  } else {
    res.status(404).json(notFoundMessage);
  }
});
module.exports = router;
