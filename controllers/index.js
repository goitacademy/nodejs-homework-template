const getListContacts = require('./contacts/getListContacts')
const getOneContactById = require('./contacts/getOneContactById')
const addOneContact = require('./contacts/addOneContact')
const removeContactById = require('./contacts/removeContactById')
const updateOneContact = require('./contacts/updateOneContact')
const updateStatusContact = require('./contacts/updateStatusContact')

module.exports = {
    getListContacts,
    getOneContactById,
    addOneContact,
    removeContactById,
    updateOneContact,
    updateStatusContact,
}