const updateContacts = require('./helpers/updateContactList');
const { v4: generateId } = require('uuid');
const listContacts = require('./listContacts')

const addContact = async ({ name, email, phone }) => {
    const contact = {
        id: generateId(),
        name,
        email,
        phone,
    }

    const contacts = await listContacts();

    //for the first element in data base
    if (!contacts) {
        const newList = [];
        newList.push(contact);
        updateContacts(newList);
        return contact;
    }

    contacts.push(contact);
    await updateContacts(contacts);
    return contact;
}

module.exports = addContact;