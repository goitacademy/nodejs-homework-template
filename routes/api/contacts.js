const contacts = require('../../models/contacts');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await contacts.listContacts();

    res.json({
      status: 'success',
      code: 200,
      data,
    });
  } catch (err) {
    console.log(err.message);
  }
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
