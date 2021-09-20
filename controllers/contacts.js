const {
  sendSuccess,
  sendNotFound,
  sendBadRequest,
  isEmpty,
} = require('../utils')

const contactsOperetaions = require('../model')

const listContacts = async (req, res) => {
  const result = await contactsOperetaions.listContacts()
  sendSuccess(res, { result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperetaions.getContactById(contactId)
  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { result })
}

const addContact = async (req, res) => {
  const result = await contactsOperetaions.addContact(req.body)
  sendSuccess(res, { result }, 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params

  if (isEmpty(req.body)) {
    sendBadRequest(res, contactId)
    return
  }
  const result = await contactsOperetaions.updateContactById(
    contactId,
    req.body
  )
  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { result })
}

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await contactsOperetaions.removeContactById(contactId)
  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { message: 'Contact deleted' })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
}
