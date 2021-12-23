const express = require('express');
const router = express.Router();
const contactsOperations = require('../../model/index');

router.get('/', async (req, res, next) => {
  const result = await contactsOperations.listContacts();
  console.log(result);
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

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
