const { NotFound, BadRequest } = require('http-errors')

const { sendSuccessResponse } = require('../helpers')
const { Contact } = require('../models')

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSuccessResponse(res, { result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId)
  if (!result) {
    throw new NotFound(`Contact with id '${contactId}' not found`)
  }
  sendSuccessResponse(res, { result })
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessResponse(res, { result }, 201)
}

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    throw new NotFound(`Contact with id '${contactId}' not found`)
  }
  sendSuccessResponse(res, { result })
}

const updateFavorite = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true },
  )
  if (!result) {
    throw new BadRequest(`Contact with id '${contactId}' not found`)
  }
  sendSuccessResponse(res, { result })
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Missing field favorite with id '${contactId}' `)
  }

  sendSuccessResponse(res, { message: 'Contact successfully deleted' })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
}
