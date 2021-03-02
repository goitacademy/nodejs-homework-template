const express = require('express')
const router = express.Router()
const path = require('path')
const validatorPath = path.resolve('model/validation.js')
const { validateBeforeCreate, validateBeforeUpdate } = require(validatorPath)
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')
router.get('/', async (_req, res) => {
  try {
    const contacts = await listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const result = await getContactById(req.params.contactId)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const result = await addContact(req.query)
    res.status(201).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    await removeContact(req.params.contactId)
    res.status(201).json({ message: 'Deleted!' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.patch('/:contactId', async (req, res) => {
  try {
    const result = await updateContact(req.params.contactId, req.query)
    res.status(201).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

module.exports = router
