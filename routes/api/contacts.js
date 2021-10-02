const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const Joi = require('joi')

const contactsOperations = require('../../model/contactsOperations')

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(3).required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await contactsOperations.getById(Number(contactId))
    if (!contacts) {
      throw new createError(404, `Product with id=${contactId} not found`)
    }
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new createError.BadRequest(error.message)
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(Number(contactId))
    if (!result) {
      throw new createError(404, `Product with id=${contactId} not found`)
    }
    res.status(201).json({
      status: 'success',
      code: 200,
      message: 'Succes delete contact'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new createError.BadRequest(error.message)
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContactsById(
      Number(contactId),
      req.body
    )
    console.log(result)
    if (!result) {
      throw new createError(404, `Product with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
