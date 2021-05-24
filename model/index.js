const Contact = require('../services/schemas/contact')

const listContacts = async () => {
  const response = await Contact.find({})
  return response
}
const getContactById = async id => {
  const response = await Contact.findById(id)
  return response
}

const addContact = async data => {
  const response = Contact.create(data)
  return response
}

const removeContact = async id => {
  const response = Contact.findByIdAndRemove(id)
  return response
}

const updateContact = async (id, body) => {
  const response = Contact.findByIdAndUpdate(id, body, { new: true })
  return response
}
const updateStatusContact = async (id, body) => {
  const response = Contact.findByIdAndUpdate(id, body, { new: true })
  return response
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}
