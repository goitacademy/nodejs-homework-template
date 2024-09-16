const { Contact } = require("../models/contacts.js");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const foundContact = await Contact.findById(contactId);
  return foundContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contact = new Contact({ name, email, phone });
  contact.save();
  return contact;
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
