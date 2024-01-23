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

const authenticateToken = require('../../middleware/authenticateToken');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const contacts = await listContacts(userId);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:contactId', authenticateToken, async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const contact = await getContactById(contactId);

    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const newContact = await addContact({ ...req.body, owner: req.user.userId });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:contactId', authenticateToken, async (req, res) => {
  const contactId = req.params.contactId;
  try {
    const result = await removeContact(contactId);

    if (result) {
      res.json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:contactId', authenticateToken, async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  try {
    const updatedContact = await updateContact(contactId, body);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:contactId/favorite', authenticateToken, async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;

    if (typeof favorite !== 'boolean') {
      return res.status(400).json({ message: 'Missing or invalid field favorite' });
    }

    const updatedContact = await updateContact(contactId, { favorite });

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