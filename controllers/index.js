const {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
  getFavorite
} = require("./contactsBook/index");

const {
  register,
  login,
  currentUser,
  logout,
  subscription,
} = require("./users/index");

const ctrl = {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
  getFavorite
};

const ctrlUser = {
  register,
  login,
  currentUser,
  logout,
  subscription,
};

module.exports = {
  ctrl,
  ctrlUser,
};
