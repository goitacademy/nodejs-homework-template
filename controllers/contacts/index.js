const {ctrlWrapper} = require("../../helpers");

const getAll = require('./getAll');

const getById = require('./getById');

const add = require('./add');

const updateById = require('./updateById');

const updateFavorite = require('./updateFavorite');

const deleteById = require('./deleteById');



module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById)
}