const { Contacts } = require("../db/contactsModel");

const listContacts = async () => {
  return await Contacts.find();
};

const getContactById = async (contactId) => {
  const contact = await Contacts.findById({ _id: contactId });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contacts.findByIdAndDelete({ _id: contactId });
  return contact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = new Contacts({ name, email, phone });
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const searchContact = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { $set: { name, email, phone } }
  );
  return searchContact;
};

const favoriteContact = async (contactId, body) => {
  const { favorite } = body;
  const searchContact = await Contacts.findByIdAndUpdate(
    { _id: contactId },
    { $set: { favorite } }
  );
  return searchContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  favoriteContact,
};
