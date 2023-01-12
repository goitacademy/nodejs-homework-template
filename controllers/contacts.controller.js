const { Contact } = require('../models/contact');

const listContacts = async limit => {
  const contacts = await Contact.find({}).limit(limit);
  return contacts;
};

const getContactById = async contactId => {
  const contact = Contact.findById(contactId);
  return contact;
};

const removeContact = async contactId => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const newContact = await Contact.create({
    name,
    email,
    phone,
    favorite,
  });
  return newContact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
};
