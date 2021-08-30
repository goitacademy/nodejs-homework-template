const { Contact } = require("../models");

const listContacts = () => {
  return Contact.find({}, "_id name email phone favorite");
};

const getById = (contactId) => {
  return Contact.findById(contactId, "_id name email phone favorite");
};

const addContact = (newContact) => {
  return Contact.create(newContact);
};

const updateById = (contactId, data) => {
  return Contact.findbyIdAndUpdate(contactId, data, { new: true });
};

const removeById = (contactId) => {
  return Contact.findbyIdAndDelete(contactId);
};

const updateStatusContact = (contactId, data) => {
  return Contact.findByIdAndUpdate(contactId, data, { new: true });
};

module.exports = {
  listContacts,
  addContact,
  getById,
  updateById,
  removeById,
  updateStatusContact,
};
