// const fs = require('fs/promises')

const contact = require("./contactModel");

const listContacts = async () => {
  return contact.find();
};

const getContactById = async (contactId) => {
  return contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return contact.create(body);
};

const updateContact = async (contactId, body) => {
  return contact.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
