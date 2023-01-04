const getAll = require('./getAll');
const getById = require("./getById");
const add = require('./add')
const updateById = require('./updateById');
const remuveById = require('./remuveById');
const updateFavorite = require("./updateFavorite")

module.exports = {
    getAll, 
    getById,
    add,
    updateById,
    remuveById,
    updateFavorite
}