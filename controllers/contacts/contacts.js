const createError = require('http-errors')
const Joi = require('joi')
const contactsFunctions = require('../../model/contacts')
const joiSchema = Joi.object({ name: Joi.string().required(), email: Joi.string().required(), phone: Joi.string().required() })

const listContacts = async (req, res, next) => {
  const contacts = await contactsFunctions.listContacts()
  res.json(contacts)
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsFunctions.getContactById(contactId)
  if (!contact) throw createError(404, `Contact with id=${contactId} not found`)
  res.json(contact)
}

const addContact = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw new createError.BadRequest(error.message)
  }
  const result = await contactsFunctions.addContact(req.body)
  res.status(201).json({ status: 'success', code: 201, data: { result } })
}

const updateContact = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw createError.BadRequest(error.message)
  }
  const { contactId } = req.params
  const result = await contactsFunctions.updateContact(contactId, req.body)
  if (!result) throw createError(404, `Contact with id=${contactId} not found`)
  res.json({ status: 'success', code: 200, data: { result } })
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await contactsFunctions.removeContact(contactId)
  if (!contact) throw createError(404, `Contact with id=${contactId} not found`)
  res.json({ message: 'contact deleted' })
}

module.exports = { listContacts, getContactById, addContact, updateContact, removeContact }
