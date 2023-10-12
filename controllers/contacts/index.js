const listContacts = require("./listContacts.js");
const getContactById = require("./getContactById.js");
const addContact = require("./addContact.js");
const removeContact = require("./removeContact.js");
const updateContact = require('./updateContact.js');
const updateFavorite = require('./updateFavorite.js');

module.exports = { 
    listContacts, 
    getContactById, 
    addContact, 
    removeContact,
    updateContact,
    updateFavorite 
};
