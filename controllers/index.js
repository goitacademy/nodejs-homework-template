const getListContacts = require('./contacts/getListContacts')
const getOneContactById = require('./contacts/getOneContactById')
const addOneContact = require('./contacts/addOneContact')
const removeContactById = require('./contacts/removeContactById')
const updateOneContact = require('./contacts/updateOneContact')

module.exports = {
    getListContacts,
    getOneContactById,
    addOneContact,
    removeContactById,
    updateOneContact,
}