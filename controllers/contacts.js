const { sendSuccess } = require('../utils')
const { Contact } = require('../model')
const { NotFound } = require('http-errors')

const listContacts = async (req, res) => {
  const result = await Contact.find(
    { owner: req.user._id },
    '_id name email phone favorite'
  )
  sendSuccess.contacts(res, result)
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOne(
    { _id: contactId, owner: req.user._id },

    '_id name email phone favorite'
  )
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found!`)
  }
  sendSuccess.contacts(res, result)
}

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  sendSuccess.contacts(res, result, 'Contact added!', 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  )

  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found!`)
  }
  sendSuccess.contacts(res, result, `Contact with id=${contactId} updated!`)
}

const removeContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: req.user._id,
  })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found!`)
  }
  sendSuccess.contacts(res, result, `Contact with id=${contactId} deleted!`)
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    { favorite },
    { new: true }
  )
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found!`)
  }
  sendSuccess.contacts(
    res,
    result,
    `Status of contact with id=${contactId} updated`
  )
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact,
}
