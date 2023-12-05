const getAll = require("./getAll");
const getById = require("./getById");
const addNewContact = require("./addNewContact");
const updateById = require("./updateById");
const updateFavoriteById = require("./updateFavoriteById");
const deleteById = require("./deleteById");


module.exports = {
    getAll,
    getById,
    addNewContact,
    updateById,
    updateFavoriteById,
    deleteById
};