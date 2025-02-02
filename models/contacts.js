const mongoose = require('mongoose');
const Contact = require('./contactModel');
const connectDB = require('../config/db');

connectDB();

const listContacts = async (userId) => {
  return await Contact.find({ owner: userId });
};

const getContactById = async (contactId, userId) => {
  return await Contact.findOne({ _id: contactId, owner: userId });
};

const removeContact = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, owner: userId });
};

const addContact = async (body, userId) => {
  const newContact = new Contact({ ...body, owner: userId });
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, body, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    body,
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }, userId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite },
    { new: true, runValidators: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
