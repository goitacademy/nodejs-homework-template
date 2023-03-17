const { Contact } = require("../models/contacts");

const getAllContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (id) => {
  return await Contact.findOne({ _id: id });
};

const createContact = async (body) => {
  return await Contact.create(body);
};

const updateContact = async (id, body) => {
  return await Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const removeContact = async (id) => {
  return await Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
