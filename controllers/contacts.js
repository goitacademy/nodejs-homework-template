const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../helpers')
const contactsOperations = require('../model/contacts')

const listContacts = async(req, res) => {
  const result = await contactsOperations.listContacts()
  sendSuccessRes(res, { result })
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const addContact = async (req, res) => {
  const result = await contactsOperations.addContact(req.body)
  sendSuccessRes(res, { data: result }, 201)
}

const updateContact = async(req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateContact(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperations.removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact
}
