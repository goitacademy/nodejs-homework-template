const listContacts = require('./listContacts');
const updateContacts = require('./helpers/updateContactList');

const deleteContactById = async (id) => {
    const contacts = await listContacts();

    // data base empty
    if (!contacts) {
        return null;
    }

    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
        return null;
    }
    const [contactDeleted] = contacts.splice(idx, 1);

    await updateContacts(contacts);

    return contactDeleted;
}

module.exports = deleteContactById;