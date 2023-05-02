const {
  getAll,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
<<<<<<< HEAD
  updateFavorite,
=======
  updateFavorite
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
} = require("./contactsBook/index");

const {
  register,
<<<<<<< HEAD
  login,
  currentUser,
  logout,
  subscription,
=======
  login
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
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
<<<<<<< HEAD
  currentUser,
  logout,
  subscription,
};

module.exports = {
  ctrl,
  ctrlUser,
=======
}

module.exports = {
  ctrl,
  ctrlUser
>>>>>>> 22513394b068499e24accb9e01491fc86a886f58
};
