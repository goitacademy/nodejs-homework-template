const getAllContacts = require('./contacts/getAllContacts')
const getContactById = require('./contacts/getContactById')
const addContact = require('./contacts/addContact')
const removeContact = require('./contacts/removeContact')
const updateContact = require('./contacts/updateContactStatus')
const updateContactStatus = require('./contacts/updateContactStatus')

module.exports = {
	getAllContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateContactStatus,
}
