import fs from 'fs/promises';
import path from 'path';
import {nanoid} from 'nanoid';

const contactsPath = path.resolve("models", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
};

async function addContact(body) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

async function updateContact(contactId, body) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = {id: contactId, ...body}
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
};

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};