const getAllContacts = require('./getAllContacts')
const getContactById = require('./getContactById')
const addContact = require('./addContact')
const removeContact = require('./removeContact')
const updateContact = require('./updateContactStatus')
const updateContactStatus = require('./updateContactStatus')

module.exports = {
	getAllContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateContactStatus,
}
