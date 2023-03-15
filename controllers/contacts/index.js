const getContacts = require('./getContacts')
const getContactsById = require('./getContactsById')
const addNewContact = require('./addNewContact')
const deleteContact = require('./deleteContact')
const changeContact = require('./changeContact')
const updateStatus = require('./updateStatus')


module.exports = {
    getContacts,
    getContactsById,
    addNewContact,
    deleteContact,
    changeContact,
    updateStatus,
};