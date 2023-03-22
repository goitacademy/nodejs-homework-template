const newContact = require("./newContact");
const getContacts = require("./getContacts");
const contactById = require("./getContactById");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
const register = require("./auth/register");
const login = require("./auth/login");
module.exports = {
  newContact,
  getContacts,
  contactById,
  deleteContact,
  updateContact,
  updateFavorite,
  register,
  login,
};
