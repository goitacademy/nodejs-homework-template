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
};
