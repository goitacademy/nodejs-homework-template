const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts")



router.get('/', listContacts, async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', getContactById, async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', removeContact, async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', addContact, async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', updateContact, async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
