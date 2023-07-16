const express = require('express');
const {
  ctrlListContacts,
  ctrlAddContact,
  ctrlGetContactById,
} = require('../../controllers/ctrlContacts');

const router = express.Router();

router.get('/', ctrlListContacts);

router.post('/', ctrlAddContact);

router.get('/:contactId', ctrlGetContactById);

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
