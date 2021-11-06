const express = require('express')
const router = express.Router()
const { NotFound } = require('http-errors')
const { validation, controllerWrapper } = require('../../middlewares')
const { Contact, joiSchemaAdd, joiSchemaPut } = require('../../models/contact')

router.get(
  '/',
  controllerWrapper(async (req, res) => {
    const result = await Contact.find({})
    res.json({
      message: 'Get contacts list',
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  })
)

router.get(
  '/:contactId',
  controllerWrapper(async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)
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
  })
)

router.post(
  '/',
  validation(joiSchemaAdd),
  controllerWrapper(async (req, res, next) => {
    const result = await Contact.create(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  })
)

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove(contactId)
  if (!result) {
    throw new NotFound('Not found')
  }
  res.json({
    message: 'contact deleted',
  })
})

router.put(
  '/:contactId',
  validation(joiSchemaPut),
  controllerWrapper(async (req, res) => {
    const { contactId } = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    })
    if (!result) {
      throw new NotFound('Not found')
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  })
)

router.patch(
  '/:contactId/favorite',
  controllerWrapper(async (req, res) => {
    const { contactId } = req.params
    const { favorite } = req.body
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    )
    if (!result) {
      throw new NotFound('Not found')
    }

    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  })
)

module.exports = router
