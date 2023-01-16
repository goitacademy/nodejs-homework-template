const express = require('express');

// const listContacts = require('../../models/contacts');
const router = express.Router();
const contacts = require('../../models/contacts.json');

router.get('/', async (req, res, next) => {
  // console.log(req.url);
  // res.send('<h2>hejlly</h2>');
  // const contacts = await listContacts.getAll();
  // res.json(contacts);
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
});

router.get('/:contactId', async (req, res, next) => {
  console.log(req.params);
  const { contactId } = req.params;
  const result = contacts.find(item => item.id === contactId);
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });

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
