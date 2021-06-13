const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../model')

const { addContactSchema, updateContactSchema } = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ contacts, status: 'success' })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await getContactById(contactId)
    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: 'missing required name field' })
  }
  try {
    const contact = await addContact(req.body)
    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await removeContact(contactId)

    if (result) {
      return res.status(200).json({ message: `contact №${contactId} deleted` })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req
  const { error } = updateContactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: 'missing fields' })
  }
  try {
    const contact = await updateContact(contactId, body)

    if (contact) {
      return res.status(200).json({ contact, status: 'success' })
    }
    res.status(404).json({ message: 'Not found' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
