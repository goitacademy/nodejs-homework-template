const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: contacts })
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const response = await getContactById(contactId);
  const responseType = typeof response;
  if (responseType === 'object') {
    res.status(200).json({ message: response })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
});

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  res.status(200).json({ message: 'template message' })
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  response = await removeContact(contactId);
  if (response !== undefined) {
    res.status(200).json({ message: response })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
});

router.put('/:contactId', async (req, res, next) => {
  const { id } = req.params;
  res.status(200).json({ message: 'template message' })
});

module.exports = router
