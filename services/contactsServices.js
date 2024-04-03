const Contact = require('../models/contacts');

async function addContact(body) {
  return Contact.create(body);
}

async function getContactById(contactId) {
  return Contact.findById(contactId);
}

async function listContacts() {
  return Contact.find();
}

async function removeContact(contactId) {
  return Contact.findByIdAndRemove(contactId);
}

async function updateContact(contactId, body) {
  return Contact.findByIdAndUpdate(contactId, body, { new: true });
}

async function updateStatusContact(contactId, body) {
  return Contact.findByIdAndUpdate(contactId, { $set: body }, { new: true });
}

module.exports = {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
};

