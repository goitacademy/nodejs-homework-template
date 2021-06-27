const Contacts = require('../model/schemaContact')

const listContacts = (owner) => {
  return Contacts.find({ owner })
}

const getContactById = (id, owner) => {
  return Contacts.findById({ _id: id, owner })
}

const removeContact = (id, owner) => {
  return Contacts.findByIdAndRemove({ _id: id, owner })
}

const addContact = ({ name, email, phone }, owner) => {
  return Contacts.create({ name, email, phone, owner })
}

const updateContact = (id, body, owner) => {
  return Contacts.findByIdAndUpdate({ _id: id, owner }, body, { new: true })
}

const getFavoriteContacts = (owner) => {
  return Contacts.find({ favorite: true, owner })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getFavoriteContacts
}
