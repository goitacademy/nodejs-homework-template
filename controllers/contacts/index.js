const {getContacts,getContactsById} = require('./getContacts');
const { createdContact } = require('./postContact');
const { updateContactById, updatedStatusContact } = require('./putPatchContact');
const { deletedContact } = require('./deleteContact')



module.exports = {
    getContacts,
    getContactsById,
    createdContact,
    updateContactById,
    deletedContact,
    updatedStatusContact
}