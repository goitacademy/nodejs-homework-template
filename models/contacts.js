const ContactModel = require("./model");
const UserModel = require("./model");

const listContacts = async () => {
  return UserModel.find();
};

const getContactById = async contactId => {
  return UserModel.findById(contactId);
};

const addContact = async contact => {
  try {
    return UserModel.create(contact);
  } catch (e) {
    console.error(e);
  }
};

const removeContact = async contactId => {
  try {
    return UserModel.findByIdAndRemove(contactId);
  } catch (e) {
    console.error(e);
  }
};

const updateContact = async (contactId, contact) => {
  try {
    return UserModel.findByIdAndUpdate(contactId, contact);
  } catch (e) {
    console.error(e);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    return UserModel.findByIdAndUpdate(contactId, body);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};