const { Contact } = require("../models/contactModel");

const getContacts = async () => {
  const result = await Contact.find({});
  return result;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};

const addContact = async ({ name, email, phone, favorite }) => {
  const result = await Contact.create({ name, email, phone, favorite });
  return result;
};

const updateContact = async (contactId, { name, email, phone, favorite }) => {
  await Contact.findByIdAndUpdate(
    { _id: contactId },
    { $set: { name, email, phone, favorite } }
  );
  return Contact.findById(contactId);
};

const updateContactStatus = async (contactId, fields) => {
  await Contact.findByIdAndUpdate({ _id: contactId }, fields, {
    new: true,
  });
  return Contact.findById(contactId);
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove({ _id: contactId });
  return result;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateContactStatus,
  removeContact,
};
