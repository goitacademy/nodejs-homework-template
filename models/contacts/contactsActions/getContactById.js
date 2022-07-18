const listContacts = require('./listContacts');

const getContactsById = async (id) => {
    const contactList = await listContacts();
    if (!contactList) {
        return null;
    }
    const result = contactList.find(item => item.id === id);
    if (!result) {
        return null;
    }
    return result;
}

module.exports = getContactsById;