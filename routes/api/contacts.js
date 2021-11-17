const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../model')
const schemaBody = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z ]+$/, 'only letters')
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/, 'only numbers')
    .required(),
})
const schemaId = Joi.number().required()

router.get('/', async (_, res) => {
  const contacts = await listContacts()
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contacts },
  })
})

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params
  const { error } = schemaId.validate(contactId)

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  const contact = await getContactById(contactId)
  if (!contact.length) res.status(404).send({ message: 'Not found' })
  res.json({
    status: 'Success',
    code: 200,
    data: { result: contact },
  })
})

router.post('/', async (req, res) => {
  const body = req.body
  const { error } = schemaBody.validate(body)

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  const newContact = await addContact(body)
  if (newContact.message) {
    res.status(400).send({ message: newContact.message })
    return
  }
  res.json({
    status: 'Created',
    code: 201,
    data: { result: newContact },
  })
})

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params
  let { error } = schemaId.validate(contactId)

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  error = await removeContact(contactId)
  if (error.message) {
    res.status(404).send({ message: error.message })
    return
  }
  res.json({
    status: 'Success',
    code: 200,
    data: { message: 'contact deleted' },
  })
})

router.patch('/:contactId', async (req, res) => {
  const body = req.body
  const { contactId } = req.params
  let { error } = schemaBody.validate(body)
  if (!error) error = schemaId.validate(contactId).error

  if (error) {
    console.log('error - ', error)
    res.status(400).send({ message: error.message })
    return
  }
  const patchedContact = await updateContact(contactId, body)
  if (patchedContact.message) {
    const code = patchedContact.message === 'Not found' ? 404 : 400
    res.status(code).send({ error: patchedContact.message })
    return
  }
  res.json({
    status: 'Success',
    code: 200,
    data: { result: patchedContact },
  })
})

module.exports = router
