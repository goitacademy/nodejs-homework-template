// const fs = require('fs/promises');
// const path = require('path');
// const { runInNewContext } = require('vm');

const { Contact } = require('./schemas/contact');

// const pathContacts = path.resolve('../models/contacts.json');
// const pathContacts = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  return await Contact.find();
};

const getContactById = async contactId => {
  return await Contact.findOne({ _id: contactId });
};

const addContact = async body => {
  return await Contact.create(body);
};

const removeContact = async contactId => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
