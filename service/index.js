const {Contact} = require('./schemas/contacts')

const getAllContacts = () => Contact.find().lean()

const getContactById = (contactId) => Contact.findById(contactId)

const addContact = (body) => Contact.insertMany(body, {new: true})

const removeContact = (id) => Contact.findOneAndDelete({_id: id})

const updateContact = (id, body) => Contact.findOneAndUpdate({_id: id}, body, {new: true})

const updateFavorite = (id, body) => Contact.findOneAndUpdate({_id: id}, body, {new: true})

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite
}