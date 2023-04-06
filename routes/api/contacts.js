const express = require('express')
const router = express.Router()
const contacts = require('../../models/contacts')
const { HttpError } = require('../../helpers')
const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().alphanum().messages({
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`
    }),
  email: Joi.string().required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`
    }),
  phone: Joi.string().required().min(7).pattern(/^[0-9]+$/).messages({
      'string.empty': `"phone" cannot be an empty field`,
      'any.required': `"phone" is a required field`
    }),
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
     throw HttpError(404, "Not found")
          }
  res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
       throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
  })

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)
      if (!result) {
     throw HttpError(404, "Not found")
          }
  res.status(200).json({"message": "contact deleted"})
 } catch (error) {
    next(error)
 }
})

router.put('/:contactId', async (req, res, next) => {
  try {
      const { error } = schema.validate(req.body)
    if (error) {
       throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
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
