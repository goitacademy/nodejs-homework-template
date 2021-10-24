const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model/index.js');

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId);

  if (!data) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(data);
});

router.post('/', async (req, res, next) => {
  const data = await addContact(req.body);

  if (!data) {
    return res.status(400).json({ message: 'missing required name field' });
  }

  res.status(201).json(data);
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await removeContact(req.params.contactId);

  if (!data) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ message: 'contact deleted' });
});

router.patch('/:contactId', async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body);

  if (!data) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(data);
});

module.exports = router;
