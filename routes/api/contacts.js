const express = require('express')
const contacts = require('../../models/contacts')
const {HttpError} = require('../../helpers')
const Joi = require("joi");
const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required,
  email: Joi.string().required,
  phone: Joi.string().required,
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contacts.getContactById(id)
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
  
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate({ name: 'doren', email: 'adoren@gmail.net', phone: '(044) 454-1111' })
    console.log(req.body)
    if (error) {
      throw HttpError(400, "Missing required field")
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
