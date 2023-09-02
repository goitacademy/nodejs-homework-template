const getAll = require("./getAll.js");
const getById = require("./getById.js");
const add = require("./add.js");
const remove = require("./remove.js");
const update = require("./update.js");
const updateStatusContact = require("./getByFavorite.js");

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact,
};
