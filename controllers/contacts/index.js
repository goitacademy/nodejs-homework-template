const getAll = require('./getAll');
const getById = require("./getById");
const add = require('./add');
const updateFavorite = require('./updateById');
const updateById = require('./updateById');
const removeById = require("./removeById");

module.exports = {
    getById,
    getAll,
    add,
    removeById,
    updateById,
    updateFavorite,
};