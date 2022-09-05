// const { findOneAndUpdate } = require("./schemas/contact.js");
const Contact = require("./schemas/contact.js");
const User = require("./schemas/user.js");

const getAllContacts = (owner) => Contact.find({ owner });
const getContactById = (id) => Contact.findById(id);
const createContact = ({ name, email, phone, _id }) =>
  Contact.create({ name, email, phone, owner: _id });
const removeContact = (id) => Contact.findByIdAndRemove(id);
const updateContact = ({ id, name, email, phone, favorite }) =>
  Contact.findByIdAndUpdate(id, { name, email, phone, favorite });
const getFavContacts = (favorite, owner) => Contact.find({ favorite, owner });

// Users

const getAllUsers = () => User.find();
const getUser = (email) => User.findOne({ email });
const getUserById = (_id) => User.findOne({ _id });
const updateUserSubscription = (_id, subscription) =>
  User.findOneAndUpdate({ _id }, { subscription });
const updateUserJWT = (_id, token) => User.findByIdAndUpdate(_id, { token });
const updateUserAvatar = (_id, avatarURL) => User.findByIdAndUpdate(_id, { avatarURL });
const updateVerificationToken = (verificationToken) =>
  User.findOneAndUpdate(
    { verificationToken },
    { isVerified: true, verificationToken: null }
  );

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  getFavContacts,
  getUser,
  getAllUsers,
  updateUserSubscription,
  getUserById,
  updateUserJWT,
  updateUserAvatar,
  updateVerificationToken,
};
