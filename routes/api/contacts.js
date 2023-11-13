const express = require('express')
const contacts = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({ message: 'template message', data: contactsList})
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json({ message: 'template message', data: contact });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
