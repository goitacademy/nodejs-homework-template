const getAll = require('./contacts/getAll')
const getById = require('./contacts/getById')
const add = require('./contacts/add')
const putById = require('./contacts/putById')
const delById = require('./contacts/delById')
const updateFavorite = require('./contacts/updateFavorite')


module.exports = {
    add,
    getAll,
    getById,
    putById,
    delById,
    updateFavorite
}