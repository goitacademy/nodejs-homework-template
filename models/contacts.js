const Contact = require("../models/contact");

const listContacts = async (userId) => {
  return await Contact.find({ owner: userId });
};

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId });
};

const removeContact = async (userId, contactId) => {
  return await Contact.findOneAndRemove({ _id: contactId, owner: userId });
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
};

const updateContact = async (userId, contactId, body) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
};

const updateStatusContact = async (userId, contactId, body) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { favorite: body.favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
