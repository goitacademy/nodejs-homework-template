const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')

router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'Success',
      code: 200,
      message: 'Contacts found',
      data: { contacts }
    })
  } catch(error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'Success',
      code: 201,
      message: 'Contact created',
      data: { contact }
    })
  } catch(error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
