const express = require('express')
const router = express.Router()
const fs = require('fs')
const contactsService = require('../../model/index.js')
const ERROR_MESSAGES = require('../../constants/index.js')

const contacts = JSON.parse(
  fs.readFileSync('./model/contacts.json', { encoding: 'utf-8' }),
)

router.get('/', async (req, res, next) => {
  const contactList = contactsService.listContacts()
  res.status(200).json(contactList)
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId

  const foundContact = contactsService.getContactById(
    Number(contactId),
    ERROR_MESSAGES.NOT_FOUND,
  )

  if (!foundContact) {
    return res.status(404).json({
      message: ERROR_MESSAGES.NOT_FOUND,
    })
  }

  res.status(200).json({ foundContact })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: ERROR_MESSAGES.MISSING_FIELD,
    })
  }

  const updateContact = contactsService.addContact(name, email, phone)

  res.status(201).json(updateContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId

  const newContacts = contactsService.removeContact(
    Number(contactId),
    ERROR_MESSAGES.NOT_FOUND,
  )

  if (newContacts.length === contacts.length) {
    return res.status(400).json({
      message: ERROR_MESSAGES.NOT_FOUND,
    })
  }

  res.status(200).json({
    message: `Contact with ID=${contactId} deleted successfully!`,
  })
})

router.patch('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: ERROR_MESSAGES.MISSING_FIELD,
    })
  }

  const updatedContacts = contactsService.updateContact(
    Number(contactId),
    name,
    email,
    phone,
    ERROR_MESSAGES.NOT_FOUND,
  )

  if (!updatedContacts) {
    return res.status(404).json({
      message: ERROR_MESSAGES.NOT_FOUND,
    })
  }

  res.status(200).json(updatedContacts)
})

module.exports = router
