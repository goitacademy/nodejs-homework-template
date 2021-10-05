const { BadRequest, NotFound } = require('http-errors')
const { contactSchema } = require('../schemas')
const contactsOperations = require('../model/contacts')

const listContacts = async(req, res, next) => {
  const contacts = await contactsOperations.listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    }
  })
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result
    }
  })
}

const updateContact = async(req, res, next) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  const { contactId } = req.params
  const result = await contactsOperations.updateContact(contactId, req.body)
  if (!result) {
    const error = new Error('Contact with id={id} not found')
    error.status = 404
    throw error
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete'
  })
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
}
