const express = require('express');
const contacts = require('../../models/contacts.js');
const { httpError } = require('../../helpers');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    // this redirects to Error handler in app.js
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      throw httpError(404, 'Not found');
    }
    res.json(contact);
  } catch (error) {
    // this redirects to Error handler in app.js
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
