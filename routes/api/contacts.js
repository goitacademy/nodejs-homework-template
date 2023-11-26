const express = require('express')
const contacts = require ('../../models/contacts') 
const {HttpError} = require('../../helpers/HttpError')
const Joi = require("joi")
const router = express.Router()
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  }
  catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
  
})  

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contacts.getContactById(id) 
    console.log(result)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({ message: 'Contact deleted' })
  }
  catch (error) {
    next(error)
  }

  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body)
    
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

module.exports = router