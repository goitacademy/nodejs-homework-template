const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const contactsFilePath = path.join(__dirname, '../../models/contacts.json');
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

async function loadContacts() {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error loading contacts:', error.message);
    throw new Error('Error loading contacts');
  }
}

async function saveContacts(contacts) {
  try {
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving contacts:', error.message);
    throw new Error('Error saving contacts');
  }
}

function validateContact(contact) {
  return contactSchema.validate(contact);
}

router.get('/', async (req, res) => {
  try {
    const contacts = await loadContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contact = contacts.find((c) => c.id === contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const contacts = await loadContacts();
    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newContact = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    contacts.push(newContact);
    await saveContacts(contacts);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    const deletedContact = contacts.splice(contactIndex, 1)[0];
    await saveContacts(contacts);
    res.json({ message: 'Contact deleted', deletedContact });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const contacts = await loadContacts();
    const contactId = req.params.id;
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex === -1) {
      return res.status(404).json({ message: 'Not found' });
    }

    const { error } = validateContact(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = {
      id: contactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    contacts[contactIndex] = updatedContact;
    await saveContacts(contacts);
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
