const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const add = require("./addContact");
const deleteById = require("./deleteContact");
const updateById = require("./updateContact");
const updateStatusContact = require("./updateFavorite");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
