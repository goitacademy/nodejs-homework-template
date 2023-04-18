const express = require('express');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../..//models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.status(200).json(listContacts());
});

router.get('/:contactId', async (req, res, next) => {
  try {
    res.status(200).json(await getContactById(req.params.contactId));
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  console.log(req.query);
  try {
    res.status(201).json(await addContact(req.body));
  } catch (err) {
    res.status(400).json({ message: 'missing required name field' });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    result ?? res.status(200).json({ message: 'contact deleted' });
  } catch (err) {
    res.status(404).json({ message: 'missing required name field' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    res.status(200).json(await updateContact(req.params.contactId, req.body));
  } catch (err) {
    res.status(err.status).json(err.message);
  }
});

module.exports = router;
