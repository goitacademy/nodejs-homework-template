const express = require('express')
const Joi = require('joi')
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts')
const router = express.Router()

router.get('/contacts', async (req, res, next) => {
  console.log('get')
  const contacts = await listContacts()
  res.status(200).json({ message: 'get template message', data: contacts })
})

router.get('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getById(contactId)
  contact ? res.json(contact) : res.status(404).json({ message: 'Not found' })
})

router.post('/contacts', async (req, res, next) => {
  const schema1 = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
  })
  // const schema = Joi.string().min(3)

  const { error, value } = schema1.validate(req.body)
  console.log(value)
  const { name, email, phone } = value
  if (error) {
    return res.status(400).json({ message: 'value less hen 3 ' })
  }
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'missing required name field' })
  }

  const contact = await addContact(req.body)
  res.status(201).json(contact)
})

router.delete('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const isDeleted = await removeContact(contactId)
  isDeleted
    ? res.json({ message: 'contact deleted' })
    : res.status(404).json({ message: 'Not found' })
})

router.put('/contacts/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const { name, email, phone } = req.body
  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields' })
  }
  const updatedContact = await updateContact(contactId, req.body)
  updatedContact
    ? res.json(updatedContact)
    : res.status(404).json({ message: 'Not found' })
})

module.exports = router
