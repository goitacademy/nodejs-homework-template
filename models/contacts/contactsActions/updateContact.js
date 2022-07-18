const listContacts = require('./listContacts');
const updateContacts = require('./helpers/updateContactList');

const updateContact = async (id, { name, email, phone }) => {

    const contacts = await listContacts();

    // empty Data Base
    if (!contacts) {
        return null;
    }

    const idx = contacts.findIndex(item => item.id === id);

    //no contact with searched id in the Data Base
    if (idx === -1) {
        return null;
    }

    contacts[idx] = {
        name,
        email,
        phone
    }

    await updateContacts(contacts);
    return contacts[idx];
}

module.exports = updateContact;