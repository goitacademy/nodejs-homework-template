const Contact = require('../models/contactSchema')

const getAllContacts = async (owner, { skip, contactsOnPage: limit, favorite }) => {
  if (favorite) {
    return await Contact.find({ owner, favorite }).skip(skip).limit(limit);  
  }
  return await Contact.find({ owner }).skip(skip).limit(limit);
}

const getContactById = async (id, owner) => {
  return await Contact.findOne({ _id: id, owner })
}

const createContact = async ({ name, email, phone, favorite }, owner) => {
  return await Contact.create({ name, email, phone, favorite, owner })
}

const updateContact = async (id, fields, owner) => {
  return await Contact.findOneAndUpdate({ _id: id, owner }, {$set: fields}, { new: true })
}

const removeContact = async (id, owner) => {
  return await Contact.findOneAndRemove({ _id: id, owner })
}

const updateStatusContact = async (id, favorite, owner) => {
  return await Contact.findOneAndUpdate({ _id: id, owner }, { favorite: favorite })
}

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
}
