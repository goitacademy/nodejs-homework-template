const getAll = require("./contacts/getAll");
const getContactById = require("./contacts/getContactById");
const addContact = require("./contacts/addContact");
const delContact = require("./contacts/delContact");
const updateContact = require("./contacts/updateContact");
const updateFavorite = require("./contacts/updateFavorite");
module.exports = {
  getAll,
  getContactById,
  addContact,
  delContact,
  updateContact,
  updateFavorite,
};
