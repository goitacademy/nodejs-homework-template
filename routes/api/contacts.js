const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

// Helper function to read contacts from JSON file
function readContacts() {
  const contactsPath = path.join(__dirname, '../../contacts.json');
  const contactsData = fs.readFileSync(contactsPath, 'utf8');
  return JSON.parse(contactsData);
}

// Helper function to write contacts to JSON file
function writeContacts(contacts) {
  const contactsPath = path.join(__dirname, '../../contacts.json');
  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
}

// Validation schema for contact data
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// GET /api/contacts
router.get('/', (req, res, next) => {
  try {
    const contacts = readContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// GET /api/contacts/:id
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const contacts = readContacts();
    const contact = contacts.find((c) => c.id === id);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// POST /api/contacts
router.post('/', (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = contactSchema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const contacts = readContacts();
    contacts.push(newContact);
    writeContacts(contacts);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/contacts/:id
router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const contacts = readContacts();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    const deletedContact = contacts.splice(index, 1)[0];
    writeContacts(contacts);

    res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
});

// PUT /api/contacts/:id
router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const { error } = contactSchema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const contacts = readContacts();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    contacts[index].name = name || contacts[index].name;
    contacts[index].email = email || contacts[index].email;
    contacts[index].phone = phone || contacts[index].phone;
    writeContacts(contacts);

    res.json(contacts[index]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
