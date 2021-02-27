const express = require('express')
const router = express.Router()
const path = require('path')
const validatorPath = path.resolve('model/validation.js')
const { validateBeforeCreate, validateBeforeUpdate } = require(validatorPath)
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')

router.get('/', async (_req, res) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ ...contacts })
  } catch (error) {
    res.status(401).json('something wrong')
  }
})

router.get('/:contactId', async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId)
    res.status(200).json({ ...contact })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/', async (req, res) => {
  try {
    await validateBeforeCreate(req.query)
    const contact = await addContact(req.query)
    res.status(201).json({ ...contact })
  } catch (error) {
    res.status(400).json({ message: 'missing required name field' })
  }
})

router.delete('/:contactId', async (req, res) => {
  try {
    await removeContact(req.params.contactId)
    res.status(201).json({ message: 'contact deleted' })
  } catch (error) {
    res.status(404).json({ message: 'contact not found' })
  }
})

router.patch('/:contactId', async (req, res) => {
  try {
    await getContactById(req.params.contactId)
    await validateBeforeUpdate(req.query)
    await updateContact(req.params.contactId, req.query)
    res.status('201').json({ message: 'Updated!' })
  } catch (error) {
    res.status('404').json({ message: error.message })
  }
})

module.exports = router
