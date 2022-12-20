const { Contact } = require("../models/contacts");

const getAllContacts = () => Contact.find().sort({ name: 1 });

const getOneContact = id => Contact.findById(id);

const addContact = body => Contact.create(body);

const removeContact = id => Contact.findByIdAndDelete(id);

const updateContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

const updateStatusContact = (id, body) =>
  Contact.findByIdAndUpdate(id, body, { new: true });

module.exports = {
  getAllContacts,
  getOneContact,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
