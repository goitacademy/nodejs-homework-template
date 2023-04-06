const { ObjectId } = require('mongoose').Types;
const Contact = require('./contacts-schema')

const listContacts = () => Contact.find();

const getContactById = (contactId) => {
  return ObjectId.isValid(contactId) ?
    Contact.findById(contactId)
    : null;
};

const addContact = (contact) => Contact.create(contact);

const updateContact = (contactId, body) => {
  return ObjectId.isValid(contactId) ?
    Contact.findByIdAndUpdate(contactId, body, { returnDocument: "after" })
    : null;
};

const removeContact = (contactId) => {
  return ObjectId.isValid(contactId) ?
    Contact.findByIdAndDelete(contactId)
    : null;
}

const updateStatusContact = updateContact;

  

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}