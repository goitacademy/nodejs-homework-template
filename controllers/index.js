const favoriteChange = require("./contacts/favoriteChange");
const createContact = require("./contacts/createContact");
const deleteContact = require("./contacts/deleteContact");
const updateContacts = require("./contacts/updateContacts");
const getContact = require("./contacts/getContact");
const getAllContacts = require("./contacts/getAllContacts");

const {
  register,
  login,
  changeSubscription,
  currentUser,
  logoutUser,
} = require("./authController/index");

module.exports = {
  favoriteChange,
  createContact,
  deleteContact,
  updateContacts,
  getContact,
  getAllContacts,
  register,
  login,
  changeSubscription,
  currentUser,
  logoutUser,
};
