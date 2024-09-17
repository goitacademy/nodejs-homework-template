const { getAllContacts } = require("./contacts-controller");
const { getById } = require("./contacts-controller");
const { addContact } = require("./contacts-controller");
const { deleteContact } = require("./contacts-controller");
const { updateContact } = require("./contacts-controller");
const { updateFavorite } = require("./contacts-controller");
const { register } = require("./auth");
const { login } = require("./auth");
const { getCurrent } = require("./auth");
const { logout } = require("./auth");
const { updateSubscription } = require("./auth");

const contacts = {
  getAllContacts,
  getById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
};

const auth = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
};

module.exports = {
  contacts,
  auth,
};
