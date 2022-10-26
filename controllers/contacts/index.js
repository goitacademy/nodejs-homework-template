const getList = require('./getList');
const getById = require('./getById');
const add = require('./add');
const update = require('./update');
const updateFavorite = require('./updateFavorite')
const remove = require('./remove');


module.exports = {
    getList,
    getById,
    add,
    update,
    updateFavorite,
    remove
}