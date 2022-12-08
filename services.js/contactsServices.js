/* eslint-disable linebreak-style */
const {Contact} = require('../models/contactModel');

const getContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

const addContact = async (body) => {
  return await Contact.create(body);
};

const removeContact = async (contactId) => {
  return await Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
      contactId, body, {new: true},
  );
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
