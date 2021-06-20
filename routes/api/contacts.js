const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model')
const {
  schemaCreate,
  schemaChange
} = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ status: 'success', contacts })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId
    const contact = await getContactById(contactId)
    if (contact) {
      res.status(200).json({ status: 'success', contact })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const validationResult = schemaCreate.validate(req.body)
    if (validationResult.error) {
      res.status(400).json({ message: 'missing required name field' })
    }
    const body = req.body
    const newContact = await addContact(body)
    res.status(201).json({ status: 'success', newContact })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId
    const deleted = await removeContact(contactId)
    if (deleted) {
      return res.status(200).json({ message: 'contact deleted' })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const validationResult = schemaChange.validate(req.body)
    if (validationResult.error) {
      res.status(400).json({ message: 'missing fields' })
    }
    const contactId = req.params.contactId
    const body = req.body
    const contact = await updateContact(contactId, body)
    if (contact) {
      return res.status(200).json({ status: 'success', contact })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
