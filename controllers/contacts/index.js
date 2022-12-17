const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const add = require("./add");
const updateById = require("./updateById");
const deleteById = require("./deleteById");
const updateFavorite = require("./updateFavorite");

module.exports = {
  listContacts,
  getContactById,
  add,
  updateById,
  deleteById,
  updateFavorite,
};
