const express = require('express')
const crypto = require('crypto')
const router = express.Router()
const Joi = require('joi')

const schema = Joi.object(
  {
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(8).max(99).required(),
  })

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.status(200)
  res.json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const contact = await getContactById(id)
  if (contact === void 0) {
    res.status(404)
    res.json({ message: 'Not found' })
  }
  res.status(200)
  res.json(contact)
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = await schema.validateAsync(req.body)
    const newContact = { id: crypto.randomInt(0, 100000), name, email, phone }
    addContact(newContact)
    res.status(201)
    res.json(newContact)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json({ message: error.message })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const contact = await removeContact(id)
  if (contact === void 0) {
    res.status(404)
    res.json({ message: 'Not found' })
  }
  res.status(200)
  res.json({ message: 'contact deleted' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body)
    const updatedContact = await updateContact(req.params.contactId, body)
    res.status(200)
    res.json(updatedContact)
  } catch (error) {
    res.status(400)
    res.json({ message: 'Not found' })
  }
})

module.exports = router
