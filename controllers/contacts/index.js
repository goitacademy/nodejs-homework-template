const { getAll } = require('./getAll');
const { getContactById } = require('./getContactById');
const { addContact } = require('./addContact');
const { updateContactById } = require('./updateContactById');
const { updateStatusContactById } = require('./updateStatusContactById');
const { deleteContactById } = require('./deleteContactById');
module.exports = {
    getAll,
    getContactById,
    addContact,
    updateContactById,
    updateStatusContactById,
    deleteContactById,
}