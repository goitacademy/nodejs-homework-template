const express = require('express');
const { listContacts } = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message 1' });
  const contacts = await listContacts();
  res.json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message 2' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message 3' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message 4' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message 5' });
});

module.exports = router;
