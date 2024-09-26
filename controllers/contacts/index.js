const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getContactsAll");
const getById = require("./getContactById");
const add = require("./addContact");
const deleteById = require("./removeContact");
const updateById = require("./editContact");
const updateFavorite = require("./togleFavorite");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
