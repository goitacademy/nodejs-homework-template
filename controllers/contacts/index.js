const getContacts = require('./getContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const changeContact = require('./updateContact')
const deleteContact = require('./deleteContact')

module.exports = {
getContacts,
getContactById,
addContact,
changeContact,
deleteContact
}