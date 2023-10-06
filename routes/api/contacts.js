const express = require('express');
const contacts = require('../../models/contacts.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json(await contacts.listContacts());
});

router.get('/:contactId', async (req, res, next) => {
  const contact = await contacts.getContactById(req.params.contactId);
  contact ? res.json(contact) : res.status(404).json({ message: 'Not found' });
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    res.status(201).json(await contacts.addContact(req.body));
  } else {
    res.status(404).json({ message: 'missing required name field' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contacts.removeContact(req.params.contactId);
  contact
    ? res.json({ message: 'contact deleted' })
    : res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
