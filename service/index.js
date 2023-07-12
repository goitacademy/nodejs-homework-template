const Contact = require("./schemas/contact");
const User = require("./schemas/user");

// CONTACTS

const getAllContacts = async (owner, favorite) => {
  return Contact.find({ owner, favorite });
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

const createUser = ({
  email,
  password,
  avatarURL,
  verify,
  verificationToken,
}) => {
  return User.create({ email, password, avatarURL, verify, verificationToken });
};

const updateUser = (email, fields) => {
  return User.findOneAndUpdate({ email }, { $set: fields }, { new: true });
};

const findUser = (userInfo) => {
  return User.findOne(userInfo);
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
  updateUser,
  findUser,
  findUserById,
};
