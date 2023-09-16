const Contact = require("../models/contact.model");

const listContacts = async (query) => {
  return Contact.find(query);
};

const getContactById = async (id, userId) => {
  return Contact.findOne({ _id: id, owner: userId });
};

const addContact = async (data) => {
  return Contact.create(data);
};

const removeContact = async (id, userId) => {
  return Contact.findOneAndDelete({ _id: id, owner: userId });
};

const updateContact = async (id, userId, data) => {
  return Contact.findOneAndUpdate({ _id: id, owner: userId }, data, {
    new: true,
  });
};

const updateFavorite = async (id, userId, favorite) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  updateFavorite,
  addContact,
};
