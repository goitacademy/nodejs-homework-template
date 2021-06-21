const Joi = require('joi')

const express = require('express')
const router = express.Router()
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact
} = require('../model/index')

// Всі контакти
router.get('/', async (req, res, next) => {
  try {
    const contactss = await listContacts()
    await res.status(200).json(contactss)
  } catch (err) { console.error(err) }
})
// вибір контакту по ІД
router.get('/:contactId', async (req, res, next) => {
  const contact = await getContactById(parseInt(req.params.contactId))
  if (contact === undefined) {
    await res.status(404).json({ message: 'Not Found' })
    return
  }
  await res.status(200).json({ contact })
})
// Додати контакт
router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .max(30),
    phone: Joi.string()
      .min(10)
      .max(14)
      .required()
  })
  const validationResult = schema.validate(req.body)
  try {
    if (validationResult.error) {
      await res.status(400).json({ message: 'not valid entry/entries' })
      return
    }
    const addedContact = await addContact(name, email, phone)
    if (!name || !email || !phone) {
      await res.status(400).json({ message: 'missing required field' })
      return
    }
    await res.status(201).json(addedContact)
  } catch (err) {
    await res.status(404).json({ message: err })
  }
})
// Видалення контакту
router.delete('/:contactId', async (req, res, next) => {
  try {
    const deleteOperation = await removeContact(parseInt(req.params.contactId))

    if (!deleteOperation) {
      await res.status(404).json({ message: 'Not Found' })
      return
    }
    await res.status(200).json({ message: 'contact deleted' })
  } catch (err) {
    await res.status(404).json({ message: err })
  }
})
// Змінити контакт
router.put('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
      .max(30),
    phone: Joi.string()
      .min(10)
      .max(14)
      .required()
  })
  const validationResult = schema.validate(req.body)
  try {
    if (validationResult.error) {
      await res.status(400).json({ message: 'not valid entry/entries' })
      return
    }
    if (Object.keys(req.body).length < 3) {
      await res.status(400).json({ message: 'missing fields' })
      return
    }
    const contact = await updateContact(name, email, phone, parseInt(req.params.contactId))
    if (contact === undefined) {
      await res.status(404).json({ message: 'Not found' })
    }
    await res.status(200).json(contact)
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
