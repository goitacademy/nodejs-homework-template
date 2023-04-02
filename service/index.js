const { Contact } = require('../models/contactsSchemas')
const mongoose = require('mongoose')

const getAllContacts = () => {
  return Contact.find()
}

const getContactById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Contact.findOne({ _id: id })
  }
}

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite })
}

const removeContact = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Contact.findOneAndRemove({ _id: id })
  }
  
}

const updateContact = (id, fields) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true })
  }
 
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
}
