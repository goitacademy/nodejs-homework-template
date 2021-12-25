const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index');
const { validateCreate, validateUpdate } = require('./validation')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json(contacts)
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
});

router.post('/', validateCreate, async (req, res, next) => {
  const newUser = await addContact(req.body)
  res.status(200).json(newUser)
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json(contact)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
});

router.patch('/:contactId', validateUpdate, async (req, res, next) => {
  const { contactId } = req.params;
  const newUser = await updateContact(contactId, req.body);
  if (newUser) {
    res.status(200).json(newUser)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
});

module.exports = router;
