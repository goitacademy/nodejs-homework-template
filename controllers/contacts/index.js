const { getAll } = require("./getAll");
const { getById } = require("./getById");
const { addContact} = require("./addContact");
const { updateFavorite } = require("./updateFavorite");
const { removeContact } = require("./removeContact");
const { updateContact} = require("./updateContact");

module.exports = {
    getAll,
    getById,
    addContact,
    updateFavorite,
    removeContact,
    updateContact,
}