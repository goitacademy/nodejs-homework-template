const Contact = require('./schemas/contact')

const getAllcontacts = async () => {
  return Contact.find({})
}

const getContactById = async ({ id } , res) => {
  return Contact.findOne({ _id: id })
}

const createContact = ({ name, email, phone }) => {
  return Contact.save({ name, email, phone })
}

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}

module.exports = {
  getAllcontacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
}