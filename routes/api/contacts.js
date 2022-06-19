const express = require('express')

const router = express.Router()

const action = require('../../models/contacts')
const Joi = require('joi')
const createError = require('../../helpers/error')

const postSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }).required(),
  phone: Joi.string().pattern(/^[0-9+()-_ ]*$/).max(20).required()
})
const putSchema = Joi.object({
  name: Joi.string().max(50),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } }),
  phone: Joi.string().pattern(/^[0-9+()-_ ]*$/).max(20)
})

router.get('/', async (req, res, next) => {
  try {
    const result = await action.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await action.getContactById(req.params.contactId)
    if (!result) {
      throw createError(404)
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = postSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new Error(error.message)
    }
      const result = await action.addContact(req.body)
      res.json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await action.removeContact(req.params.contactId)
    if (result === null) {
      throw createError(404)
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  
  try {
    const { error } = putSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new Error(error.message)
    }
  const {name, email, phone} = req.body
    if (!name && !email && !phone) {
      throw createError(400, 'Missing Fields')
    }
    const result = await action.updateContact(req.params.contactId, req.body)
    if (result === null) { // если контакта с таким id нет
      throw createError(404)
    }
    res.json(result)
  } catch (error) { next(error) }
})

module.exports = router
