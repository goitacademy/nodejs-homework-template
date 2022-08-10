const express = require('express')
const operations = require('../../models/contacts')
const router = express.Router()
const Joi = require('joi')
const createErrors = require('http-errors')

const asyncHandler = require('express-async-handler')

const contasctsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
})

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const contacts = await operations.listContacts()

    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  }),
)

router.get(
  '/:contactId',
  asyncHandler(async (req, res, next) => {
    const { contactId } = req.params

    const result = await operations.getContactById(contactId)

    if (!result) {
      throw createErrors(404, `No such contact `)
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  }),
)

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { error } = contasctsSchema.validate(req.body)

    if (error) {
      const missed = error.message
        .slice(0, error.message.indexOf(' '))
        .slice(0, -1)
        .slice(1)

      error.status = 400
      error.message = `missing required ${missed} field`
      throw error
    }
    const result = await operations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    })
  }),
)

router.delete(
  '/:contactId',
  asyncHandler(async (req, res, next) => {
    const { contactId } = req.params
    const result = await operations.removeContact(contactId)

    if (!result) {
      throw createErrors(404, 'Not found')
    }
    res.json({
      status: 'succes',
      code: 200,
      message: 'contact deleted',
      data: {
        result,
      },
    })
  }),
)

router.put(
  '/:contactId',
  asyncHandler(async (req, res, next) => {
    const { error } = contasctsSchema.validate(req.body)
    if (error) {
      const missed = error.message
        .slice(0, error.message.indexOf(' '))
        .slice(0, -1)
        .slice(1)

      error.message = `missing required ${missed} field`
      error.status = 400
      throw error
    }

    const { contactId } = req.params

    const result = await operations.updateContact(contactId, req.body)

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  }),
)

module.exports = router
