const express = require('express');

const contacts = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const list = await contacts.listContacts();
  res.json(list);
});

router.get('/:contactId', async (req, res, next) => {
  const contactById = await contacts.getContactById(req.params.contactId);
  console.log(contactById);
  contactById ? res.json(contactById) : res.json({ message: 'Not found' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  const isDeleted = await contacts.removeContact(req.params.contactId);
  res.json(isDeleted ? { message: 'contact deleted' } : { message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
