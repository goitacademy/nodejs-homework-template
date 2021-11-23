const express = require('express')
const router = express.Router()
const { NotFound } = require('http-errors')
const Joi = require('joi')

const contactsOperations = require('../../model')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    console.log(res.json)
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contactById = await contactsOperations.getContactById(contactId)
    if (!contactById) {
      throw new NotFound(`Product with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contactById
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
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
      throw new NotFound(`Product with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
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
    const { error } = contactSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw error
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'product updated',
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
