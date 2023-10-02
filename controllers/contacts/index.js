const listContacts = require('../../controllers/contacts/listContacts')
const getContactById = require('../../controllers/contacts/getContactById')
const addContact = require('../../controllers/contacts/addContact')
const removeContact = require('../../controllers/contacts/removeContact')
const updateContact = require('../../controllers/contacts/updateContact')
const updateStatusContact = require('../../controllers/contacts/updateStatusContact')

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}