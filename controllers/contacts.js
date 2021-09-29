const { NotFound } = require('http-errors')
const { sendSuccessResponse } = require('../helpers')
const contactsOperations = require('../model/contacts')

const listContacts = async (req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessResponse(res, { data: result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { data: result })
}

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSuccessResponse(res, { data: result }, 201)
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { message: 'Successfully deleted' })
}

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  sendSuccessResponse(res, { data: result })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
}
