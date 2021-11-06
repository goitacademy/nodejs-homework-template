const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

const { addPostValidation } = require('../../middlewares')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200).json({ contacts, status: 'success' })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(req.params.contactId)
  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json({ contact, status: 'success' })
})

router.post('/', addPostValidation, async (req, res, next) => {
  const newContact = await addContact(req.body)
  if (!newContact) {
    return res.status(400).json({ message: 'missing required name field' })
  }
  res
    .status(201)
    .json({ newContact, message: 'New contact is added succesfully' })
})

router.delete('/:contactId', async (req, res, next) => {
  const contacts = await removeContact(req.params.contactId)
  if (!contacts) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.json({ contacts, message: `contact ${req.params.contactId} is deleted` })
})

router.patch('/:contactId', addPostValidation, async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body)
  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res
    .status(200)
    .json({ contact, message: `Contact ${contact.id} is changed` })
})

module.exports = router
