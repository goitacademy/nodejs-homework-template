const getAll = require("./getAllContact");
const getById = require("./getContactById");
const add = require("./addContact");
const updateById = require("./updateByContactId");
const  updateFavoriteById = require("./updateFavoriteById")
const remove = require("./removeContact");

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  remove,
   updateFavoriteById,
};