const { Contact } = require('./schemas')

const getContacts = (params = {}) => {
  return Contact.find(params) // {name: "Herald"}
}

const getContactById = (id) => {
  return Contact.findById(id)
}

const addContact = (contact) => {
  return Contact.create(contact)
}

const updateContact = (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true })
}

const updateStatusContact = (id, contact) => {
  return Contact.findByIdAndUpdate(id, contact, { new: true })
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove(id)
}

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact
}
