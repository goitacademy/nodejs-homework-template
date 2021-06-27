const Contacts = require('../model/schemaContact')

const listContacts = () => {
  return Contacts.find()
}

const getContactById = (id) => {
  return Contacts.findById({ _id: id })
}

const removeContact = (id) => {
  return Contacts.findByIdAndRemove({ _id: id })
}

const addContact = ({ name, email, phone }) => {
  return Contacts.create({ name, email, phone })
}

const updateContact = (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
