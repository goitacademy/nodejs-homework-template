const { User } = require("./contacts.model");

const listContacts = async () => {
  return User.find();
};

const getContactById = async (contactId) => {
  return User.findById(contactId);
};

const removeContact = async (contactId) => {
  return User.findByIdAndRemove({ _id: contactId });
};

const addContact = async (body) => {
  return User.create(body);
};

const updateContact = async (contactId, body) => {
  return User.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
