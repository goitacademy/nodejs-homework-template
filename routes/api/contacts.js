const express = require('express');
const { listContacts, getById, removeContact, addContact, updateContact } = require('../../models/contacts');

const router = new express.Router();

router.get('/', listContacts);
router.get('/:contactId', getById); 

router.post('/', async (req, res, next) => {
  // const { name, email, phone } = req.body;
  addContact();
  res.json({ message: 'template message' });
})

router.delete('/:contactId', async (req, res, next) => {
  removeContact(req.params.contactId);
  res.json({ message: 'template message' });
})

router.put('/:contactId', async (req, res, next) => {
  updateContact(req.params.contactId);
  res.json({ message: 'template message' });
})

module.exports = router;

