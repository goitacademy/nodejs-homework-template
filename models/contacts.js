const Contact = require("./contactModel");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
