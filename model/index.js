// const fs = require('fs/promises')
// const contacts = require('./contacts.json')

const listContacts = async (req, res) => {
  res.json({ message: "template message" });
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
