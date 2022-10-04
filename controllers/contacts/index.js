const getAll = require('./getAll');
const getById = require('./getById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    getAll,
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
};