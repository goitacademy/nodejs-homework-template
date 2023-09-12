const Contact = require("../models/contact.model");

const getAllContacts = async (userId) => {
  return Contact.find({ owner: userId });
};

const getContactById = async (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, owner }) => {
  return Contact.create({ name, email, phone, owner });
};

const updateContact = (id, fields) => {
  return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, { favorite }) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite } },
    { new: true }
  );
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
