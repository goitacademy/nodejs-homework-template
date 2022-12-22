const Contact = require('./schemas/contacts');
const { validateId } = require('../utils/validation');

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  if (validateId(id)) {
    return Contact.findOne({ _id: id });
  }
  return false;
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  if (validateId(id)) {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  }
  return false;
};

const removeContact = (id) => {
  if (validateId(id)) {
    return Contact.findByIdAndDelete({ _id: id });
  }
  return false;
};

const updateContactStatus = (id, { favorite }) => {
  if (validateId(id)) {
    return Contact.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
  }
  return false;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateContactStatus,
};
