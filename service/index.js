const Contact = require("./schemas/contact");
const User = require("./schemas/user");

// CONTACTS

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }) => {
  return Contact.create({ name, email, phone, favorite });
};

const updateContact = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: fields }, { new: true });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const updateStatusContact = (id, { favorite }) => {
  return Contact.findOneAndUpdate({ _id: id }, { favorite }, { new: true });
};

// USERS

const createUser = ({ email, password }) => {
  return User.create({ email, password });
};

const updateToken = ({ email, token }) => {
  return User.findOneAndUpdate({ email }, { token }, { new: true });
};

const findUser = ({ email }) => {
  return User.findOne({ email });
};

const findUserById = ({ userId }) => {
  return User.findById(userId);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
  createUser,
  updateToken,
  findUser,
  findUserById,
};
