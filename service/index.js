const Contact = require("./schemas/contact");
const mongoose = require("mongoose");

const getContacts = async () => {
  return Contact.find();
};

const getContactById = (contactId) => {
  if (mongoose.Types.ObjectId.isValid(contactId)) {
    return Contact.findOne({ _id: contactId });
  }
  return null;
};

const addContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (contactId, fields) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, fields, { new: true });
};

const removeContact = (contactId) => {
  if (mongoose.Types.ObjectId.isValid(contactId)) {
    return Contact.findByIdAndRemove({ _id: contactId });
  }
  return null;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
