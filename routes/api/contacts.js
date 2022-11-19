const express = require('express')
const router = express.Router()

const contactsOperations = require("../../models/contacts")


//------------------------------------------------------------
router.get('/', async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json(contacts)
  // res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.getContactById()
  res.json(contact)
  // res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  const contact = await contactsOperations.addContact()
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.removeContact()
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  const contact = await contactsOperations.updateContact()
  res.json({ message: 'template message' })
})


module.exports = router
