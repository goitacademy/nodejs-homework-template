const Contact = require("../service/schemas/contact");

const getAllContacts = async () => {
  return Contact.find()
}

const getContactById = (id) => {
  return Contact.findOne({ _id: id })
}

const createContact = ({ name,email,phone,favorite }) => {
  return Contact.create({ name,email,phone,favorite })
}

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id },fields)
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
}