const { getAllContacts } = require("./getAllContacts");
const { getById }= require('./getById');
const { addContact } = require("./addContact");
const { updateContactById } = require("./updateContactById");
const { updateFavorite } = require("./updateFavorite");
const { deleteContactById } = require("./deleteContactById");

module.exports = {
    getAllContacts,
    getById,
    addContact,
    updateContactById,
    updateFavorite,
    deleteContactById,

};