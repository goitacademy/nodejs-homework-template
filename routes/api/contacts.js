const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const contacts = await listContacts(userId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const userId = req.user.id;

  try {
    const contact = await getContactById(contactId, userId);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const newContact = await addContact(req.body, userId);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const userId = req.user.id;

  try {
    const result = await removeContact(contactId, userId);

    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:contactId', async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;
  const userId = req.user.id;

  try {
    const updatedContact = await updateContact(contactId, body, userId);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:contactId/favorite', async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;

    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'Missing or invalid field favorite' });
    }

    const userId = req.user.id;
    const updatedContact = await updateContact(contactId, { favorite }, userId);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;