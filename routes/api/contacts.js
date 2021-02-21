const express = require('express');
const router = express.Router();
const Contact = require('../../model');

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    return res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: 'Not found' });
    }
    return res.json({ contact });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contact.addContact(req.body);
    if (!req.body) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
