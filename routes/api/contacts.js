const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model')
const { schema } = require('../../services/validation')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.json({
    message: 'success',
    status: 200,
    contacts
  })
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId

  const contact = await getContactById(id)

  res.json({
    message: 'success',
    status: 200,
    contact: contact
  })
})

router.post('/', async (req, res, next) => {
  const { error } = schema.validate(req.body)

  if (error) {
    res.status(400).json({
      message: 'bad request',
      status: 400
    })
  } else {
    const newContact = await addContact(req.body)
    res.status(201).json({
      message: 'success',
      status: 201,
      contact: ('new contact', newContact)
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const removedContact = await removeContact(id)
  res.json({
    message: 'success',
    status: 204,
    data: ` ${removedContact}`
  })
})

router.patch('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const { error } = schema.validate(req.body)

  if (error) {
    res.status(400).json({
      message: 'bad request',
      status: 400
    })
  } else {
    const updatedContact = await updateContact(id, req.body)

    res.json({
      message: 'success',
      status: 200,
      data: `contact ${updatedContact} was updated `
    })
  }
})

module.exports = router
