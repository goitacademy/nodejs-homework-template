const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("./contacts");

const { register, logIn, LogOut, currentUser } = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  register,
  logIn,
  LogOut,
  currentUser,
};
