const { query } = require("express");
const Contact = require("./schemas/contact");
const User = require("./schemas/user");

const getAllContacts = async (owner, params) => {
  return Contact.find(owner, "-createdAt -updatedAt", params).populate(
    "owner",
    "name email"
  );
};

const getFavoriteContacts = async (query, params) => {
  return await Contact.find(query, "-createdAt -updatedAt", params).populate(
    "owner",
    "name email"
  );
};

const getContactById = (id) => {
  return Contact.findById(id);
};

const createContact = (contact) => {
  return Contact.create(contact);
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, { ...fields }, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContacts,
  getFavoriteContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
