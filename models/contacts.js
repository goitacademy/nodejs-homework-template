const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async contactId => {
    const data = await listContacts();
    const contact = data.find(item => item.id === contactId);

    if (!contact) {
        return null;
    }

    return contact;
};

const removeContact = async contactId => {
    const data = await listContacts();
    const idx = data.findIndex(item => item.id === contactId);

    if (idx === -1) {
        return null;
    }

    const updatedContacts = data.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));

    return data[idx];
};

const addContact = async body => {
    const newContact = { id: v4(), ...body };

    const data = await fs.readFile(contactsPath, 'utf8');

    const contacts = JSON.parse(data);
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
};

const updateContact = async (contactId, body) => {
    const data = await listContacts();

    const idx = data.findIndex(item => item.id === contactId);

    if (idx === -1) {
        return null;
    }

    data[idx] = { id: contactId, ...body };

    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data[idx];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
