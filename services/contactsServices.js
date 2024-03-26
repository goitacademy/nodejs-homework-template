const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, '..', 'data', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === contactId);
}

async function addContact(body) {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
        const [removed] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return removed;
    }
    return null;
}

async function updateContact(contactId, body) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index !== -1) {
        contacts[index] = { ...contacts[index], ...body };
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts[index];
    }
    return null;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
};
