const { sendSuccess, sendError } = require('../utils')

const contactsOperetaions = require('../model')
const listContacts = async (req, res) => {
  const result = await contactsOperetaions.listContacts()
  sendSuccess(res, { result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperetaions.getContactById(contactId)
  if (!result) {
    throw sendError.NotFound(res, contactId)
  }
  sendSuccess(res, { result })
}

const addContact = async (req, res) => {
  const result = await contactsOperetaions.addContact(req.body)
  sendSuccess(res, { result }, 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperetaions.updateContactById(
    contactId,
    req.body
  )
  if (!result) {
    throw sendError.NotFound(contactId)
  }
  sendSuccess(res, { result })
}

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperetaions.removeContactById(contactId)
  if (!result) {
    throw sendError.NotFound(contactId)
  }
  sendSuccess(res, { message: 'Success delete' })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
}
