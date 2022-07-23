const getAll = require("./getAll");
const getById = require("./getById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateById = require("./updateById");
const updateFavorite = require("./updateFavorite")

module.exports = {
    getAll,
    getById,
    addContact,
    deleteContact,
    updateById,
    updateFavorite
}