const deleteById = require('./deleteById')
const add = require('./add')
const getAll = require('./getAll')
const getById = require('./getById')
const updateById = require('./updateById')
const patchFavoriteById = require('./patchFavoriteById')

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
    patchFavoriteById
}