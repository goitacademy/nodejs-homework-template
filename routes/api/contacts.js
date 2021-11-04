const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../models/contacts/index')

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})
const putJoiShema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().allow(''),
    phone: Joi.string().required()
  }),
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().allow(''),
    phone: Joi.string().allow('')
  }),
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().required(),
    phone: Joi.string().allow('')
  })
)

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({
      status: 'sucsess',
      code: 200,
      data: { contacts }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const idNormalize = Number(req.params.contactId)
    const contact = await getContactById(idNormalize)
    if (!contact) {
      throw new NotFound(`Contact with id ${idNormalize} not found`)
    }
    res.json({
      status: 'sucsess',
      code: 200,
      data: { contact }
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const contact = await addContact(req.body)
    if (!contact) {
      throw new BadRequest('Contact already exist')
    }
    res.status(201).json({
      status: 'sucsess',
      code: 201,
      data: { contact }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const idNormalize = Number(req.params.contactId)
    const contact = await removeContact(idNormalize)
    if (contact === null) {
      throw new NotFound(`Contact with id ${idNormalize} not found`)
    }
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = putJoiShema.validate(req.body)
    if (error) {
      throw new BadRequest('missing fields')
    }
    const idNormalize = Number(req.params.contactId)
    const updatedContact = await updateContact(idNormalize, req.body)
    if (updatedContact === 'Contact not found') {
      throw new NotFound(`Contact with id ${idNormalize} not found`)
    }
    if (updatedContact === 'Contact already exist') {
      throw new BadRequest(updatedContact)
    }
    res.json({
      status: 'sucsess',
      code: 200,
      data: { updatedContact }
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
