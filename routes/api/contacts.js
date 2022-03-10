const express = require('express')
const {
  getContactById,
  listContacts,
  removeContact,
} = require('./../../models/contacts')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.json({ message: contacts })
})

router.get('/:contactId', async (req, res, next) => {
  console.log('rqg', req.params.contactId)
  const contact = await getContactById(req.params.contactId)
  res.json({ message: contact })
})

router.post('/', async (req, res, next) => {
  console.log('req', req.body)
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const contacts = removeContact(req.params.contactId)
  res.json({ message: contacts })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
