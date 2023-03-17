const Contact = require("../service/schemas/contact");

const getAllContacts = async () => {
  return Contact.find()
}

const getContactById = (id) => {
  return Contact.findOne({ _id: id })
}

const createContact = ({ name,email,phone }) => {
  return Contact.create({ name,email,phone })
}

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id },{ $set: body },{ new: true })
}

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id })
}
const updateStatusContact = async (contactId, body) => {
  return await updateContact(contactId, body);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
}