const getAllContacts = require('./getAllContacts')
const getOneContact = require('./getOneContact')
const addContact = require('./addContact')
const deleteContact = require('./deleteContact')
const updateContact = require('./updateContact')
const updateFavorite = require('./updateFavorite')

module.exports = {
    getAllContacts,
    getOneContact,
    addContact,
    deleteContact,
    updateContact,
    updateFavorite
}