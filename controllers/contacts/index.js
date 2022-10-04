const getAll = require('./getAll');
const getById = require("./getById");
const add = require('./add');
const updateFavorite = require('./update');
const update = require('./update');
const remove = require("./remove");

module.exports = {
    getById,
    getAll,
    add,
    remove,
    update,
    updateFavorite,
};