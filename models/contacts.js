const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    try {
        const allContacts = await fs.readFile(contactsPath);
        return JSON.parse(allContacts);
    } catch (error) {
        console.log(error);
    }
};

async function getContactById(contactId) {
    try {
        const allContacts = await listContacts();
        const contactById = allContacts.find(el => el.id === contactId);
        return contactById || null;
    } catch (error) {
        console.log(error);
    }
};

async function removeContact(contactId) {
    try {
        const allContacts = await listContacts();
        const contactIndex = allContacts.map(el => el.id).indexOf(contactId);
        allContacts.splice(contactIndex, 1);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
        return allContacts
    } catch (error) {
        console.log(error);
    }
}

async function addContact(name, email, phone) {
    try {
        const allContacts = await listContacts();
        const newContact = {
            id: Date.now(),
            name: name,
            email: email,
            phone: phone
        };
        allContacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};