const CreateError = require('http-errors')
const express = require('express')
const router = express.Router()
const contactsOperation = require('../../model/index')
const Joi = require('joi')
const { validation400 } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', ctrl.getAll)

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

router.post('/', validation400(schema), async (req, res, next) => {
  try {
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

router.put('/:contactId', validation400(schema), async (req, res, next) => {
  try {
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
