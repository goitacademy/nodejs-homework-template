const { getAllContacts } = require("./contacts");
const { getById }= require("./contacts");
const { addContact } = require("./contacts");
const { updateContactById } = require("./contacts");
const { updateFavorite } = require("./contacts");
const { deleteContactById } = require("./contacts");

module.exports = {
    getAllContacts,
    getById,
    addContact,
    updateContactById,
    updateFavorite,
    deleteContactById,

};