const { ctrlWrapper } = require('../../helpers');
const listContacts = require('./listContacts');
const getContactById = require('./getContactsById');
const removeContact = require('./removeContact');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const updateFavoriteContact = require('./updateFavoriteContact');



module.exports = {
    getContactById: ctrlWrapper(getContactById),
    listContacts: ctrlWrapper(listContacts),
    addContact: ctrlWrapper(addContact),
    removeContact: ctrlWrapper(removeContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavoriteContact:ctrlWrapper(updateFavoriteContact)
}