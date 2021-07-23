const Contact = require('../schemas/contact');

const getAllContact = async () => {
  return Contact.find();
};

const getContactsById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete({ _id: id });
};

module.exports = {
  getAllContact,
  getContactsById,
  createContact,
  updateContact,
  removeContact,
};
