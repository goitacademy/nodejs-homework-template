const CreateError = require('http-errors')
const express = require('express')
const router = express.Router()
const contactsOperation = require('../../model/index')
const Joi = require('joi')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (_, res, next) => {
  try {
    const result = await contactsOperation.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperation.getContactById(contactId)
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`)
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

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const result = await contactsOperation.addContact(req.body)
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
  // res.json({ message: "template message" });
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperation.removeContact(contactId, req.body)
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Remove success',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new CreateError(400, error.message)
    }
    const { contactId } = req.params
    const result = await contactsOperation.updateContact(contactId, req.body)
    if (!result) {
      throw new CreateError(404, `Contact with id-'${contactId}' not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
