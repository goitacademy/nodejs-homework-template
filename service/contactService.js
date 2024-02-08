const Contact = require("./schemas/contactSchemas");
const mongoose = require("mongoose");

const getAllContactsByUserEmail = (email) => {
  return Contact.find({ email: email });
};

const getContactById = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Contact.findOne({ _id: id });
  } else {
    return null;
  }
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const removeContact = (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Contact.findOneAndRemove({ _id: id });
  }
  return null;
};

const updateContact = (id, fields) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  }
  return null;
};

module.exports = {
  getAllContactsByUserEmail,
  getContactById,
  createContact,
  removeContact,
  updateContact,
};
