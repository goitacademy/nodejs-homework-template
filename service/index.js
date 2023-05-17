const Contact = require("./schemas/contact");
const User = require("./schemas/user");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
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

const checkUser = (email) => {
  return User.findOne({ email });
};

const removeToken = (id, fields) => {
  return User.findByIdAndUpdate({ _id: id }, fields);
};

const getUser = (email) => {
  return User.findOne({ email });
};

const updateAvatar = (id, fields) => {
  return User.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  checkUser,
  removeToken,
  getUser,
  updateAvatar,
};
