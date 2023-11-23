const express = require('express');

const contacts = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json({ status: 200, message: 'success', result });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  res.json({ status: 200, message: `contact id: ${contactId}`, result });
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
