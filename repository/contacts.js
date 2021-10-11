const Contact = require("../model/contacts.js");

const listContacts = async () => await Contact.find({});

const getContactById = async (contactId) => await Contact.findById(contactId);

const addContact = async (body) => await Contact.create(body);

const removeContact = async (contactId) =>
  await Contact.findByIdAndRemove({ _id: contactId });

const updateContact = async (contactId, body) =>
  await Contact.findByIdAndUpdate(
    { _id: contactId },
    { ...body },
    { new: true }
  );

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
