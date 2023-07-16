const express = require('express');
const { ctrlListContacts, ctrlAddContact } = require('../../controllers/ctrlContacts');

const router = express.Router();

router.get('/', ctrlListContacts);

router.post('/', ctrlAddContact);

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
