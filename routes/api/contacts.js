const express = require('express');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data.length === 0) {
    res.status(404).json({ message: 'Not found' });
    return;
  }
  res.json(data);
});

router.post('/', async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (data) {
    res.json({ message: 'contact deleted' });
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', async (req, res, next) => {
  // if (!req.body) {
  //   res.status(400).json({ message: 'missing fields' });
  // }

  const updatedContact = await updateContact(req.params.contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

module.exports = router;
