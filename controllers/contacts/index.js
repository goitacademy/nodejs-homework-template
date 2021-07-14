const getAll = require('./getAll')
const getById = require('./getById')
const del = require('./del')
const patch = require('./patch')
const patchFavorite = require('./patch-favorite')
const add = require('./add')

module.exports = {getAll, getById, del, patch, add, patchFavorite}