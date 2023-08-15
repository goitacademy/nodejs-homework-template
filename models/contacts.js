const ContactModel = require("./model");

const listContacts = async () => {
  return ContactModel.find();
};

const getContactById = async contactId => {
  return ContactModel.findById(contactId);
};

const addContact = async contact => {
  try {
    return ContactModel.create(contact);
  } catch (e) {
    console.error(e);
  }
};

const removeContact = async contactId => {
  try {
    return ContactModel.findByIdAndRemove(contactId);
  } catch (e) {
    console.error(e);
  }
};

const updateContact = async (contactId, contact) => {
  try {
    return ContactModel.findByIdAndUpdate(contactId, contact);
  } catch (e) {
    console.error(e);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    return ContactModel.findByIdAndUpdate(contactId, body);
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
