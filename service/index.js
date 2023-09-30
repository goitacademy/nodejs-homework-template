const Contact = require("./schemas/contacts");
const User = require("./schemas/users");

const getAllContacts = async () => {
  return Contact.find();
};

const getContactById = (id) => {
  return Contact.findOne({ _id: id });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: fields }, { new: true });
};

const updateStatusContact = (id, fields) => {
  return Contact.findOneAndUpdate({ _id: id }, { $set: fields }, { new: true });
};
const findUserByEmail = async (email) => await User.findOne({ email });

const createUser = async ({ email, password, avatarUrl }) => {
  const newUser = new User({ email, password, avatarUrl });
  newUser.setPassword(password);
  await newUser.save();
  return newUser;
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  createContact,
  updateContact,
  updateStatusContact,
  findUserByEmail,
  createUser,
};
