const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavourite,
} = require('./contacts');

const Contact = require('./contactShema');

const User = require('./userSchema');


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateContactFavourite,
    Contact,
    User,
}

