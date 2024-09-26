const {
    getAll,
    getById,
    addContact,
    updateContactById,
    deleteContactById,
    updateStatusContact,
  } = require("./contacts/contact");
  
const { register } = require('./users/auth');
const { login } = require('./users/auth');
const { getCurrent } = require('./users/auth');
const {logout} = require('./users/auth');
const {updateAvatar} =require('./users/auth');

  module.exports = {
    getAll,
    getById,
    addContact,
    updateContactById,
    deleteContactById,
    updateStatusContact,
    register,
    login,
    getCurrent,
    logout,
    updateAvatar,
  };