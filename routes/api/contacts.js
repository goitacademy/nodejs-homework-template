const express = require('express')
const router = express.Router()
const { addContactSchema, updateContactSchema } = require('../../utils/validate/schemas')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: { result: contacts },
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
  } else {
    res.status(200).json({
      status: 'success',
      code: 200,
      data: { result: contact },
    })
  }
})

router.post('/', async (req, res, next) => {
  const contact = req.body
  const { error } = addContactSchema.validate(contact)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing required name field',
    })
    return
  }
  const newContact = await addContact(contact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result: newContact },
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const delContact = await removeContact(contactId)
  delContact
    ? res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
    })
    : res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const body = req.body
  const { error } = updateContactSchema.validate(body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
  const update = await updateContact(contactId, body)
  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: update },
  })
})

module.exports = router
