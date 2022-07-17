const fs = require('fs/promises');
const path = require('path');
const {v4} = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(contacts);
}


const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const res = contacts.find(contact => contact.id === contactId);
    if (!res) {
        return null
    }
    return res;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
        return
    }
    const [removeContact] = contacts.splice(idx, 1);
    await updateContacts(contacts)
    return removeContact
}


const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        ...data,
        id: v4(),
    }

    contacts.push(newContact)
    await updateContacts(contacts)
    return newContact
}

const updateContactById = async (id, data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(contact => contact.id === id);
    if (idx === -1) {
        return null
    }
    contacts[idx] = {...data, id};
    await updateContacts(contacts);
    return contacts[idx]
}

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContactById
}
