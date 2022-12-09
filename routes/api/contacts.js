const express = require('express')
const contacts = require('../../models/contacts')
const {HttpError} = require('../../helpers')
const Joi = require("joi");
const router = express.Router()

const validatingSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

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
    const { error } = validatingSchema.validate(req.body)
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
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "Contact deleted"
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = validatingSchema.validate(req.body)
    if (error) {
      throw HttpError(400, "Missing required field")
    }
    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
