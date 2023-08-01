const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("./contacts");

const {
  register,
  logIn,
  logOut,
  currentUser,
  updateUserSubscription,
  updateUserAvatar,
} = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  register,
  logIn,
  logOut,
  currentUser,
  updateUserSubscription,
  updateUserAvatar,
};
