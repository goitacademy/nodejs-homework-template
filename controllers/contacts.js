const contactsOperations = require('../model/contactsOperations')
const CreateError = require('http-errors')
const Joi = require('joi')
const { response } = require('express')

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().min(3).required(),
})

const getAll = async (req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    contacts
  })
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsOperations.getById(Number(contactId))
  if (!contact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }

  res.json(
    {
      status: 'success',
      code: 200,
      contact
    })
}

const add = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw new CreateError.BadRequest(error.message)
  }
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

const remove = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(Number(contactId))
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `contact with id = ${contactId} not found`
    })
    return
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    message: `contact with id = ${contactId} successfully deleted`,
  })
}

const updateById = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw new CreateError.BadRequest(404, error.message)
  }
  const { contactId } = req.params
  const result = await contactsOperations.updateContactsById(
    Number(contactId),
    req.body
  )
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  })
}
module.exports = {
  getAll,
  getById,
  add,
  remove,
  updateById
}
