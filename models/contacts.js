const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async contactId => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
};

const removeContact = async contactId => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const removeContact = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
};

const addContact = async body => {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
};

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    contacts[idx] = { ...body, id: contactId };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
