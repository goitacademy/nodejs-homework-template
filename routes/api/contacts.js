const express = require('express');
const contacts = require('../../models/contacts.js');
const { contactValidator } = require('../../utils/validator.js');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      res.status(400).json({ message: 'missing required name field' });
    }
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contacts.removeContact(id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact was remove' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactValidator(body);
    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }
    const id = req.params.contactId;
    const contact = await contacts.updateContact(id, body);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
