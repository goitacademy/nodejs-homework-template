const { v4 } = require('uuid')

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

async function listContacts() {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const contact = {
        id: v4(),
        name,
        email,
        phone
    }

    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
}

async function updateContact(contactId, name, email, phone) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null;
    }
    const contact = {
        id: contactId,
        name,
        email,
        phone
    }

    contacts[idx] = contact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
}


module.exports = { listContacts, getContactById, removeContact, addContact, updateContact }