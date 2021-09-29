const express = require('express')
const router = express.Router()
const { BadRequest, NotFound } = require('http-errors')

const contactOperations = require('../../model/index')
const { contactSchema } = require('../../schemas')

router.get('/', async (req, res, next) => {
  try {
    const result = await contactOperations.getAllContacts()
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.getContactById(contactId)
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const { error } = contactSchema.validate(req.body)
    if (error) {
      throw new NotFound(error.message)
    }
    const result = await contactOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.removeContact(contactId)
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const result = await contactOperations.updateContact(contactId, req.body)
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
