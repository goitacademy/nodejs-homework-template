const Contact = require('./schemas/contacts')

const getAllContacts = async () => {
  return Contact.find()
}

const getContactById = (id) => {
  return Contact.findOne({ _id: id })
}

const createContact = ({ name, phone, email, favorite }) => {
  return Contact.create({ name, phone, email, favorite })
}

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}

// const updateStatusContact = (contactId, body) => {
//   return 
// }

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
}