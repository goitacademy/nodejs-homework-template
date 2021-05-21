const express = require('express')
const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index.js')

router.get('/api/contacts', async (req, res, next) => {
  try {
    const contactsList = await listContacts()
    // res.json({ message: 'template message' })
    res.json({ message: `${contactsList}` })
  } catch (e) {
    next(e)
  }
})

router.get('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req)
    res.json({ message: `${contact}` })
  } catch (e) {
    next(e)
  }
})

router.post('/api/contacts', async (req, res, next) => {
  try {
    const contact = addContact(req)
    res.json({ message: `${contact}` })
  } catch (e) {
    next(e)
  }
})

router.delete('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const contactToDelete = removeContact(req)
    res.json({ message: `${contactToDelete}` })
  } catch (e) {
    next(e)
  }
})

router.patch('/api/contacts/:contactId', async (req, res, next) => {
  try {
    const updatedContact = updateContact(req)
    res.json({ message: `${updatedContact}` })
  } catch (e) {
    next(e)
  }
})

module.exports = router
