/** @format */

const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const update = require("./update");
const remove = require("./remove");
const updateFavorite = require("./updateFavorite");

// module.exports = { getAll, getById, add, remove, update, updateFavorite };
module.exports = { add, getAll, getById, remove, update, updateFavorite };