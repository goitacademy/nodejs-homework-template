const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const removeById = require("./removeById");
const putById = require("./putById");
const patchFavoriteById = require("./patchFavoriteById");

module.exports = {
    getAll,
    getById,
    add,
    removeById,
    putById,
    patchFavoriteById        
}