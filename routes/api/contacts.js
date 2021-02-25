const express = require('express')
const router = express.Router()
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
    const contact = await getContactById(req.params.contactId)
    res.status(200).json({ ...contact })
  } catch (error) {
    res.status(404).json({ message: 'Not found' })
  }
})

router.post('/', async (req, res) => {
  try {
    const contact = await addContact(req.query)
    res.status(201).json({ ...contact })
  } catch (error) {
    res.status(400).json({ message: 'Missing required field' })
  }
})

router.delete('/:contactId', async (req, res) => {
  const result = await removeContact(req.params.contactId)
  if (result) {
    res.status(201).json({ message: 'Contact deleted!' })
  } else {
    res.status(404).json({ message: 'Contact not found' })
  }
})

router.patch('/:contactId', async (req, res) => {
  try {
    const result = await updateContact(req.params.contactId, req.query)
    res.status('201').json({ message: result })
  } catch (error) {
    res.status('404').json({ message: error.message })
  }
})

module.exports = router
