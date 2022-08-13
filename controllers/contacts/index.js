const getAll = require('./getAll')
const getContact = require('./getContact')
const createContact = require('./createContact')
const removeContact = require('./removeContact')
const updateContact = require('./updateContact')
const updateFavoriteContact = require('./updateFavoriteContact')

module.exports = {
    getAll,
    getContact,
    createContact,
    removeContact,
    updateContact,
    updateFavoriteContact
}