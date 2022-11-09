const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await getContactById(contactId);
  if (result) {
    res.json(result);
  }
  res.status(404).json({ message: 'Not found' });
});

router.post('/', async (req, res, next) => {
  const data = req.body;
  const result = await addContact(data);
  res.status(201).json(result);
});

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await removeContact(contactId);
  if (result) {
    res.json({ message: 'contact deleted' });
  }
  res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const data = req.body;
  const result = await updateContact(contactId, data);
  if (result) {
    res.json(result);
  }
  res.status(404).json({ message: 'Not found' });
});

module.exports = router;
