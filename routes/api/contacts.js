const express = require('express');
const { listContacts, getContactById } = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  res.json({ status: 'success', data: { result } });
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
