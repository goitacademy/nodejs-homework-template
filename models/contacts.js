const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = async contacts =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async id => {
    const contacts = await listContacts();
    const contactsId = String(id);
    const result = contacts.find(el => el.id === contactsId);
    return result || null;
};

const removeContact = async id => {
    const contacts = await listContacts();
    const contactsId = String(id);
    const index = contacts.findIndex(el => el.id === contactsId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

const updateContact = async (id, body) => {
    const contacts = await listContacts();
    const contactsId = String(id);
    const index = contacts.findIndex(el => el.id === contactsId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, ...body };
    await updateContacts(contacts);
    return contacts[index];
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
