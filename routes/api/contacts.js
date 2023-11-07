const express = require('express');

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res, next) => {
  const newContact = req.body;
  const createdContact = await addContact(newContact);
  res.status(201).json(createdContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (result) {
    res.json({ message: 'Contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = req.body;
  const result = await updateContact(contactId, updatedContact);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;

