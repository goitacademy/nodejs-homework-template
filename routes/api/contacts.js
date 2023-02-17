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
  res.json(contactById);
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
