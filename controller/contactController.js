const Contact = require("../models/contact.model");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await Contact.findById(contactId);
  return contacts;
};

const removeContact = async (contactId) => {
  const contact = await Contact.deleteOne({ _id: contactId });
  return contact;
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  const contactNew = await Contact.create({ name, email, phone, favorite });
  return contactNew;
};

const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId }, body);
  return contact;
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
