const ContactSchema = require('./schemas/contactSchema')

const getAllContacts = () => {
  return ContactSchema.find()
}

const getContactById = (id) => {
  return ContactSchema.findOne({ _id: id })
}

const createContact = ({ name, email, phone, favorite }) => {
  return ContactSchema.create({ name, email, phone, favorite })
}

const updateContact = (id, fields) => {
  return ContactSchema.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
  return ContactSchema.findByIdAndRemove({ _id: id })
}

const updateStatusContact = (id, favorite) => {
  return ContactSchema.findByIdAndUpdate({ _id: id }, { favorite: favorite })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
}
