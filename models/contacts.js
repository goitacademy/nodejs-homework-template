const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "db", "contacts.json");


async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

function updateContacts(contacts) {
   return fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf8');
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(({id}) => contactId === id);
    return contact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { ...contacts, id: nanoid(4), name: name, email: email, phone: phone }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const deleteContacts = contacts.filter(({ id }) => id !== contactId);
    await updateContacts(deleteContacts);
    return contacts.filter(({ id }) => id === contactId);
}

module.exports = { listContacts, addContact, updateContacts, removeContact, getContactById };

