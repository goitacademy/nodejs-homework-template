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
  res.json({ message: contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { id } = req.params;
  res.json({ message: req.params })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const { id } = req.params;
  removeContact(id);
  res.json({ message: 'contact removed' })
})

router.put('/:contactId', async (req, res, next) => {
  const { id } = req.params;
  res.json({ message: 'template message' })
})

module.exports = router
