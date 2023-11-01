const express = require('express');
const operations = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await operations.listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.getContactById(contactId);
  // if (!contact) {
  // }
  res.status(200).json(contact);
});

router.post('/', async (req, res, next) => {
  const contact = await operations.addContact(req.body);
  res.status(201).json(contact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.removeContact(contactId);
  res.status(200).json({ message: 'contact deleted' });
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await operations.updateContact(contactId, req.body);
  res.status(200).json(contact);
});

module.exports = router;
