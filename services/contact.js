const { Contact } = require("../models");

const addContact = (newContact) => {
  return Contact.create(newContact);
};

const listContacts = () => {
  return Contact.find({});
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const removeContact = (id) => {
  return Contact.findByIdAndDelete(id);
};

const updateContact = (id, data) => {
  return Contact.findByIdAndUpdate(id, data);
};

const updateContactStatus = (id, data) => {
  return Contact.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus
};
