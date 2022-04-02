const fs = require("fs/promises");

const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
};

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const removeContacts = contacts[idx];
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContacts;
};

const addContact = async({ name, email, phone }) => {
    const data = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(data);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return data;
};

const updateContact = async(contactId, { name, email, phone }) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    contacts[idx] = { contactId, name, email, phone };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};