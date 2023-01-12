const { ctrlWrapper } = require('../utils');
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
} = require('./contacts');
const { signUp, login, logout, getCurrent } = require('./auth');
const {
  updateSubscription,
  updateAvatar,
  verifyEmail,
  sendVerificationMail,
} = require('./users');

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateContactFavorite: ctrlWrapper(updateContactFavorite),
  signUp: ctrlWrapper(signUp),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  sendVerificationMail: ctrlWrapper(sendVerificationMail),
};
