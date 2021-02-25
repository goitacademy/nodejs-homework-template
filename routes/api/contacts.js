const express = require('express');
const router = express.Router();
const Contact = require('../../model/index');

let contacts = null;

router.get('/', async (req, res, next) => {
  const contact = await Contact.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    },
  });
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.post('/', async (req, res, next) => {
  const contact = await Contact.addContact(req.body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { contact },
  });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
