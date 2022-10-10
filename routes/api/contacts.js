const express = require('express')
const Joi = require('joi')

const contacts = require('../../models/contacts')

const { RequestError } = require('../../helpers')

const router = express.Router()

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) { 
    next(error)
  }
})



router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw RequestError('Not found', 404)
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      throw RequestError(`missing required ${error.message}field`, 400)
    }

    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId)
  res.json(result)
})

router.put('/:contactId', async (req, res, next) => {
  const result = await contacts.updateContact(req.params.contactId, req.body)
  res.json(result)
})

module.exports = router
