const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../helpers')
const { Contact } = require('../models')

const listContacts = async(req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSuccessRes(res, { result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, '_id name email phone favorite')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, { result }, 201)
}

const updateContact = async(req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, result, 200, 'Contact has been successfully updated')
}

const updateFavoriteContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (result) {
    throw NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, result, 200, 'Contact has been successfully updated')
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, result, 200, 'Contact has been successfully deleted')
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavoriteContact,
  removeContact
}
