const express = require('express');

const router = express.Router();

// const contactsOperations = require('../../models');

router.get('/', async (req, res, next) => {
  // const contacts = await contactsOperations.listContacts();
  res.json({ message: 'template message' });
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
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
