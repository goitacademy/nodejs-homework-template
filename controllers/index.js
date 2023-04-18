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
}

module.exports = {
  ctrl,
  ctrlUser
};
