const express = require('express')
const router = express.Router()
const Joi = require('joi')

const controlContacts = require('../../model/index')

router.get('/', async (req, res, next) => {
  const data = await controlContacts.listContacts()
  res.status(200).json(data)
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const data = await controlContacts.getContactById(contactId)
  data ? res.status(200).json(data) : res.status(404).json({ message: 'Not found' })
})

router.post('/', async (req, res, next) => {
  const shema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(10)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.number()
      .integer()
      .min(89000000000)
      .max(89999999999)
      .required()
  })

  const { error } = shema.validate(req.body)

  if (error) {
    const text = error?.details[0].message.replace(/["]/g, '')
    res.status(400).json({ message: text })
    return
  }

  const updateData = await controlContacts.addContact(req.body)
  res.status(201).json(updateData)
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const data = await controlContacts.removeContact(contactId)
  data.status === 200
    ? res.status(200).json({ message: 'contact deleted' })
    : res.status(400).json({ message: 'Not found' })
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const obj = Object.keys(req.body)
  if (obj.length === 0) {
    res.status(400).json({ message: 'missing fields' })
    return
  }

  const shema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(2)
      .max(10)
      .allow(''),
    email: Joi.string()
      .email()
      .allow(''),
    phone: Joi.number()
      .integer()
      .min(89000000000)
      .max(89999999999)
      .allow(''),

  })

  const { error } = shema.validate(req.body)

  if (error) {
    const text = error?.details[0].message.replace(/["]/g, '')
    res.status(400).json({ message: text })
    return
  }

  const updateItems = {}
  for (const key of obj) {
    if (req.body[key].trim().length !== 0) updateItems[key] = req.body[key]
  }

  const data = await controlContacts.updateContact(contactId, updateItems)
  data
    ? res.status(200).json(data)
    : res.status(404).json({ message: 'Not found' })
})

module.exports = router
