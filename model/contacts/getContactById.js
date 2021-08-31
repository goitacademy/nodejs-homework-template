const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const selectContact = contacts.find((item) => String(item.id) === String(contactId));
        if (!selectContact) {
            return null;
        }
        return selectContact;
    }
    catch(error) {
        throw new Error(`Contact with id = ${contactId} not found`) ;
    }
}

module.exports = getContactById;