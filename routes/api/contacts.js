const express = require('express');
const { listContacts, getContactById } = require('../../services/contacts');

const router = express.Router();

router.get('/contacts', async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: { contacts },
  });
  // res.status(200).json({ contacts });
});

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (contactById === undefined) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json({
    status: 'success',
    code: 200,
    data: { contactById },
  });
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
