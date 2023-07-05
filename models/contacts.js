const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const updateContacts = async (contacts) => {
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

const addContact = async (body) => {
    const contacts = await listContacts();
    const id = nanoid();
    const newContact = { id, ...body };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;
    contacts[index] = {
        id: contactId,
        name,
        email,
        phone,
    };
    await updateContacts(contacts);
    return contacts[index];
};

module.exports = {
    updateContacts,
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
