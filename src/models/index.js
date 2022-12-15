const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavorite
} = require('./contacts');

const Contact = require('./contactShema');

const User = require('./userSchema');


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavorite,
    Contact,
    User,
}

