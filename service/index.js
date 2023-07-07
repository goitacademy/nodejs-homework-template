const Contact = require("./schemas/contact");
const User = require("./schemas/user");

// CONTACTS

const getAllContacts = async (owner) => {
  return Contact.find({ owner });
};

const getContactById = (id, owner) => {
  return Contact.findOne({ _id: id, owner });
};

const createContact = ({ name, email, phone, favorite, owner }) => {
  return Contact.create({ name, email, phone, favorite, owner });
};

const updateContact = (id, owner, fields) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    { $set: fields },
    { new: true }
  );
};

const removeContact = (id, owner) => {
  return Contact.findOneAndRemove({ _id: id, owner });
};

const updateStatusContact = (id, owner, { favorite }) => {
  return Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite },
    { new: true }
  );
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
