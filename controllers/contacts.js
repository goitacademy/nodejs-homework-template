const { Contact } = require("../models/contact");

const listContacts = async () => {
  const contacts = await Contact.find();
  //   return JSON.parse(contacts);
  return contacts;
};

const getContactById = async (contactId) => {
  //   const contacts = await listContacts();
  //   const contact = contacts.find((el) => el.id === contactId);
  //   return contact || null;
  const contact = await Contact.findById(contactId);
  return contact;
};

const addContact = async (body) => {
  const contact = await Contact.create(body);

  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const updateContact = async (contactId, body) => {
  const updContact = Contact.findByIdAndUpdate(contactId, body, { new: true });
  return updContact;
};

module.exports = {
  removeContact,
  addContact,
  getContactById,
  listContacts,
  updateContact,
};
