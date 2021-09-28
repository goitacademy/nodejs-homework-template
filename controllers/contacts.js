const { sendSuccess, sendNotFound } = require('../utils')
const { Contact } = require('../model')

const listContacts = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite')
  sendSuccess(res, { result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(
    contactId,
    '_id name email phone favorite'
  )
  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { result })
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccess(res, { result }, 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })

  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { result })
}

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { message: 'Contact deleted' })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )
  if (!result) {
    sendNotFound(res, contactId)
    return
  }
  sendSuccess(res, { message: 'Status of contact updated' })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact,
}
