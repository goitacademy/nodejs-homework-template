const express = require('express')
const router = express.Router()
// const CreateError = require('http-error')
const { NotFound, BadRequest } = require('http-error')
const Joi = require('joi')
const contactsOperations = require('../../model/index')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'uk', 'org', 'ca'] },
    })
    .required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  try {
    const contact = await contactsOperations.getContactById(contactId)
    if (!contact) {
      throw new NotFound()
      // const error = new Error('Not found')
      // error.status = 404
      // throw error
      // return res.status(404).json({ message: 'Not found' })
    }
    res.json(contact)
  } catch (error) {
    next(error)
    // const { status = 500, message = 'Server error' } = error
    // res.status(status).json({ message })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newContact = await contactsOperations.addContact(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

// don't work
router.patch('/:contactId', async (req, res, next) => {
  // console.log('req.body', req.body)
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { id } = req.params
    const updateContact = await contactsOperations.updateContact({
      id,
      ...req.body,
    })
    if (!updateContact) {
      throw new NotFound()
    }
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const deleteContact = await contactsOperations.removeContact(contactId)
    if (!deleteContact) {
      throw new NotFound()
    }
    res.json({ message: 'product delete' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
