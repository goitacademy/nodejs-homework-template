const Contact = require("../models/contacts");

const listContacts = (userId) => ({ owner: userId });

const getContactById = (contactId, userId) =>
  Contact.findById({ _id: contactId, owner: userId });

const removeContact = (contactId, userId) =>
    Contact.findByIdAndDelete({ _id: contactId, owner: userId });

const addContact = (body, userId) => Contact.create({ ...body, owner: userId });

const updateContact = (contactId, body, userId) =>
  Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, body, {
    new: true,
  });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
