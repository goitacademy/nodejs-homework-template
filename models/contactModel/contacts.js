const ContactModel = require("./contactModel");

const listContacts = async () => {
  return ContactModel.find();
};

const getContactById = async (contactId) => {
  return ContactModel.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return ContactModel.findByIdAndRemove({ _id: contactId });
};

const addContact = async (contact) => {
  return ContactModel.create(contact);
};

const updateContact = async (contactId, body) => {
  return ContactModel.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

const updateFavoriteContact = async (contactId, body) => {
  return ContactModel.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
};
