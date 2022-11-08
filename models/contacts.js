const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.contactId === contactId);
    return result || null;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.contactId === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

const addContact = async (body) => {
    const contacts = await listContacts();
    body.contactId = nanoid();
    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return body;
}

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.contactId === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = {contactId, ...body};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
