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
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru', 'org', 'lv'] } }).required(),
  phone: Joi.string().required(),
})

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
    if (contact.status === 'BadRequest') {
      throw new BadRequest(contact.message)
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
    if (contact.status === 'Contact not found') {
      throw new NotFound(`Contact with id ${idNormalize} not found`)
    }
    res.json({ message: 'contact deleted' })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiShema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const idNormalize = Number(req.params.contactId)
    const updatedContact = await updateContact(idNormalize, req.body)
    switch (updatedContact.status) {
      case 'Contact not found':
        throw new NotFound(`Contact with id ${idNormalize} not found`)
        // eslint-disable-next-line no-unreachable
        break
      case 'BadRequest':
        throw new BadRequest(updatedContact.message)
        // eslint-disable-next-line no-unreachable
        break
      default: res.json({
        status: 'sucsess',
        code: 200,
        data: { updatedContact }
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
