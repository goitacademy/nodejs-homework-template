const { Contact } = require("../models/contactModel");

const getAllContacts = async (owner) => {
  return await Contact.find({ owner });
};

const getContactById = async (id, owner) => {
  return await Contact.findOne({ _id: id, owner });
};

const createContact = async ({ name, email, phone, favorite }, owner) => {
  return await Contact.create({ name, email, phone, favorite, owner });
};

const updateContact = async (id, body, owner) => {
  return await Contact.findOneAndUpdate({ _id: id, owner }, body, {
    new: true,
  });
};

const removeContact = async (id, owner) => {
  return await Contact.findOneAndRemove({ _id: id, owner });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
