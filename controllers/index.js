const {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite
} = require("./contactsBook/index");

const {
  register,
  login
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
}

module.exports = {
  ctrl,
  ctrlUser
};
