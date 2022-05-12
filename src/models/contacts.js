const { Contacts } = require("../db/contactsModel");

const listContacts = async () => await Contacts.find();

const getContactById = async (contactId) =>
  await Contacts.findOne({ _id: contactId });

const removeContact = async (contactId) =>
  await Contacts.findByIdAndRemove(contactId);

const addContact = async (name, email, phone, favorite) =>
  await Contacts.create({ name, email, phone, favorite });

const updateContact = async (contactId, body) =>
  await Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });

const updateStatusContact = async (contactId, body) =>
  await Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
