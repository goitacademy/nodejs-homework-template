const { ctrlWrapper } = require('../../helpers/index.js');
const listContacts = require('./listContacts.js');
const getById = require('./getById.js');
const addContact = require('./addContact.js');
const removeContact = require('./removeContact.js');
const updateById = require('./updateById.js');
const updateFavorite = require('./updateFavorite.js');

module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
};
