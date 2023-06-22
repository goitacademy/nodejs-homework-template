const {
    getAll,
    getById,
    addContact,
    updateContactById,
    deleteContactById,
    updateStatusContact,
  } = require("./contacts/contact");
  
const { register } = require('./auth/auth');

  module.exports = {
    getAll,
    getById,
    addContact,
    updateContactById,
    deleteContactById,
    updateStatusContact,
    register,
  };