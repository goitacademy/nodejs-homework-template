const { User } = require("../models/contacts.model");

const listContacts = async (filterOptions) => {
  return User.find(filterOptions);
};

const getContactById = async (filter) => {
  return User.findOne(filter);
};

const removeContact = async (filter) => {
  return User.findOneAndRemove(filter);
};

const addContact = async (filter) => {
  return User.create(filter);
};

const updateContact = async (filter, update) => {
  return User.findOneAndUpdate(filter, update, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
