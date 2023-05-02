const {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
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
