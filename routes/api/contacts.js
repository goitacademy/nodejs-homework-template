const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(4).required().email(),
  phone: Joi.string()
    .min(9)
    .max(14)
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, 'numbers')
    .required(),
})

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json({
      message: 'Get contacts list',
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

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const numberId = Number(contactId)
    const result = await getContactById(numberId)
    if (!result) {
      throw new NotFound('Not found')
    }
    res.json({
      message: 'Get contact by contactId',
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

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await addContact(req.body)
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
    const numberId = Number(contactId)
    const result = await removeContact(numberId)
    if (!result) {
      throw new NotFound('Not found')
    }
    res.json({
      message: 'contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest('missing fields')
    }
    const { contactId } = req.params
    const numberId = Number(contactId)
    const result = await updateContact(numberId, req.body)
    res.status(201).json({
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
