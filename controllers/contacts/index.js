const getContacts = require('./getContacts');
const getContactById = require('./getContactsById');
const postContact = require('./postContact');
const deleteContact = require('./deleteContact');
const putContact = require('./putContact');

module.exports = {
    getContacts,
    getContactById,
    postContact,
    deleteContact,
    putContact,
}