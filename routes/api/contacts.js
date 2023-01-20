const express = require('express')
const createError = require('http-errors')
const Joi = require('joi')

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
})

const router = express.Router()

const contactsOperations = require('../../models/contacts')

router.get('/', async (req, res, next) => {

  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'succsess',
      code: 200,
      result: contacts
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error'
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      throw createError(404, `Product with id ${contactId} not found`)
    }
    res.json({
      status: 'succsess',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'succsess',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      throw createError(404, `Product with id ${contactId} not found`)
    }
    res.json({
      status: 'Success',
      code: 200,
      message: 'Contact delete',
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)
    if (!result) {
      throw createError(404, `Product with id ${contactId} not found`)
    }
    res.json({
      status: 'succsess',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
