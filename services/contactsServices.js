const { User } = require("../models/contacts.model");

const listContacts = async (Userid) => {
  return User.find({ owner: Userid });
};

const getContactById = async (contactId, userId) => {
  return User.findOne({ _id: contactId, owner: userId });
};

const removeContact = async (contactId, userId) => {
  return User.findOneAndRemove({ _id: contactId, owner: userId });
};

const addContact = async (body, UserId) => {
  return User.create({ ...body, owner: UserId });
};

const updateContact = async (contactId, body) => {
  return User.findOneAndUpdate({ _id: contactId }, body, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
