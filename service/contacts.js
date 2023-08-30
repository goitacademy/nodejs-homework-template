const fs = require("fs/promises");
const path = require("node:path");
const Contact = require("../schemas/contact");

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  console.log(contactId);
  return Contact.findById(contactId);
};

const addContact = async (body) => {
  return Contact.create(body);
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
};
//
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
