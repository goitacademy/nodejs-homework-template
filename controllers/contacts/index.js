const addContact = require("./add");
const deleteContact = require("./delete");
const getAllContacts = require("./getAllContacts");
const getById = require("./getById");
const updateById = require("./updateById");
const updateStatusContact = require("./updateFavorite");

module.exports = {
  addContact,
  deleteContact,
  getAllContacts,
  getById,
  updateById,
  updateStatusContact,
};
