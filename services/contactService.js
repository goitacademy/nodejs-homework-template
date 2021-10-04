const Contact = require('../model/contacts')

const listContacts = async () => {
  const data = await Contact.find({}, { __v: 0 })
  return data
}

const getContactById = async (contactId) => {
  const data = await Contact.findOne({ _id: contactId }.select('-__v'))
  return data
}

const addContact = async (body) => {
  const data = await Contact.create(body)
  return data
}

const updateContact = async (contactId, body) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId }, { ...body }, { new: true }
  )
  return data
}

const removeContact = async (contactId) => {
  const data = await Contact.findByIdAndRemove({ _id: contactId })
  return data
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
}
