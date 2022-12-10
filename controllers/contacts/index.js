const getContacts = require('./getContacts')
const getContactId = require('./getContactById')
const addContact = require('./addContact')
const changeContact = require('./updateContact')
const deleteContact = require('./deleteContact')
const updateStatusContact = require('./updateStatus')

module.exports = {
getContacts,
getContactId,
addContact,
changeContact,
deleteContact,
updateStatusContact
}