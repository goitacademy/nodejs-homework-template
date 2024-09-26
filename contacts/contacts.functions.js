const contact = require("./contacts.model");

const listContacts = async () => {
  return contact.find();
};

const getContactById = async (contactId) => {
  return contact.findById(contactId);
};

const removeContact = async (contactId) => {
  return contact.findByIdAndRemove(contactId);
};

const addContact = async (body) => {
  return contact.create(body);
};

const updateContact = async (contactId, body) => {
  return contact.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, favorite) => {
  return contact.findByIdAndUpdate(contactId, { favorite });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
