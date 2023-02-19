const { Contact } = require("../models/contacts");

const getAllContacts = async () => {
  const contacts = Contact.find();
  return contacts;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
  });
  await contact.save();
  return contact;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, { new: true });
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, { new: true }).exec();
  return contact;
};

module.exports = { getAllContacts, addContact, getContactById, updateContact, removeContact, updateStatusContact };
