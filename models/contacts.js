const Contact = require("./contactModel");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (err) {
    console.error("Error reading contacts:", err);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (err) {
    console.error("Error getting contact by ID:", err);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndDelete(contactId);
  } catch (err) {
    console.error("Error removing contact:", err);
    return false;
  }
};

const addContact = async (body) => {
  try {
    return await Contact.create(body);
  } catch (err) {
    console.error("Error adding contact:", err);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  try {
    return await Contact.findByIdAndUpdate(contactId, body, { new: true });
  } catch (err) {
    console.error("Error updating contact:", err);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
