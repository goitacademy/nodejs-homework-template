const { Contact } = require('../schemas/contacts');

const getContacts = async () => {
  try {
    return await Contact.find();
  } catch {
    return false;
  };
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch {
    return false;
  };
};

const addContact = async ({ name, email, phone }) => {
  try {
    return await Contact.create({ name, email, phone });
  } catch {
    return false;
  };
};

const deleteContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch {
    return false;
  };
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch {
    return false;
  };
};

const updateIsFavoriteContact = async (contactId, favorite) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  } catch {
    return false;
  };
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateIsFavoriteContact,
};