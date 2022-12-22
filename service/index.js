const Contacts = require('./schemas/contacts')

const listContacts = async () => {
  return Contacts.find()
}

const getContactById = (id) => {
  return Contacts.findOne({ _id: id })
}

const createContact = ({ name, email, phone }) => {
  return Contacts.create({ name, email, phone })
}

const updateContact = (id, body) => {
  return Contacts.findByIdAndUpdate({ _id: id }, body, { new: true })
}

const removeContact = (id) => {
  return Contacts.findByIdAndRemove({ _id: id })
}

module.exports = {
  listContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
}
