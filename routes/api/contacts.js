const express = require('express')
const router = express.Router()

const { listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact
} = require('../../models/contacts.js')



router.get('/', async () => { await listContacts() })

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

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
