const { CLIEngine } = require('eslint');
const fs = require('fs/promises');
const path = require('path');
const { v4: makeId } = require('uuid');

const pathToContacts = path.join(__dirname, './contacts.json');
const encoding = 'utf8';

console.log('log:' + pathToContacts);

async function listContacts() {
    try {
        const result = await fs.readFile(pathToContacts, encoding);
        const contacts = JSON.parse(result);
        return contacts;
    } catch (error) {
        console.log('Error:', error);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const requiredContact = contacts.find(
            ({ id }) => id.toString() === contactId,
        );
        return requiredContact;
    } catch (error) {
        console.log('Error:', error);
    }
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactToDelete = contacts.filter(
        ({ id }) => id.toString() === contactId,
    );

    const updatedContactList = contacts.filter(
        ({ id }) => id.toString() !== contactId,
    );
    await fs.writeFile(
        pathToContacts,
        JSON.stringify(updatedContactList, null, 2),
    );
    return contactToDelete;
}

async function addContact({ name, email, phone }) {
    const contacts = await listContacts();
    const newContact = { id: makeId(), name, email, phone };
    const updatedContactList = [...contacts, newContact];
    await fs.writeFile(
        pathToContacts,
        JSON.stringify(updatedContactList, null, 2),
    );
    return newContact;
}

async function updateContact(contactId, reqBody) {
    const contacts = await listContacts();
    const contactToUpdate = contacts.filter(
        ({ id }) => id.toString() === contactId,
    );

    const newContact = { ...contactToUpdate, ...reqBody };
    const newContacts = contacts.map(contact =>
        contact.id.toString() === contactId ? newContact : contact,
    );

    await fs.writeFile(pathToContacts, JSON.stringify(newContacts, null, 2));
    return contactToUpdate;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
