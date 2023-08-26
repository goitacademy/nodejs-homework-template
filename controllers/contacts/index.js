const getAll = require("./getAll").getAll;
const getById = require("./getById").getById;

const add = require("./add").add;
const remove = require("./remove").remove;
const update = require("./update").update;
const isFavorite = require("./isFavorite").isFavorite;

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  isFavorite,
};
