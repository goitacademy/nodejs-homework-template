const express = require('express')
// const createError = require("http-errors")
const { BadRequest, NotFound, InternalServerError } = require('http-errors')
const Joi = require('joi')

const contacstOperations = require('../../model/index.js')

const joiStrictSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

const joiOptionalSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contactsData = await contacstOperations.listContacts()

    if (!contactsData) throw new InternalServerError("Can't read data from file")

    res.status(200).json({
      status: 'Contacts received',
      code: 200,
      data: {
        contactsData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contactData = await contacstOperations.getContactById(contactId)

    if (contactData === undefined) throw new NotFound(`Can't find contact with id ${contactId}`)

    if (!contactData) throw new InternalServerError('File input / output error')

    res.status(200).json({
      status: 'Contact found',
      code: 200,
      data: {
        contactData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiStrictSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }

    const contactData = await contacstOperations.addContact(req.body)

    if (!contactData) throw new InternalServerError('File input / output error')

    res.status(201).json({
      status: 'Contact added',
      code: 201,
      data: {
        contactData
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params

    const result = await contacstOperations.removeContact(contactId)

    if (result === undefined) throw new NotFound(`Can't find contact with id ${contactId}`)

    if (!result) throw new InternalServerError('File input / output error')

    res.status(200).json({
      status: 'Contact deleted',
      code: 200
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params

    if (!(req.body.name || req.body.email || req.body.phone)) throw new BadRequest('Missing fields to update')

    const { error } = joiOptionalSchema.validate(req.body)
    if (error) throw new BadRequest(error.message)

    const contactData = await contacstOperations.updateContact(contactId, req.body)

    if (contactData === undefined) throw new NotFound(`Can't find contact with id ${contactId}`)
    if (!contactData) throw new InternalServerError('File input / output error')

    res.status(200).json({
      status: 'Contact updated',
      code: 200,
      data: {
        contactData
      }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
