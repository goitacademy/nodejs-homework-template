const Contact = require("../models/contacts");

const listContacts = () => Contact.find();

const getContactById = (contactId) => Contact.findById(contactId);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = (body) => Contact.create(body);

const updateContact = (contactId, body) =>
  Contact.findByIdAndUpdate(contactId, body, { new: true });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
