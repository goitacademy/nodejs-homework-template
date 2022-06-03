const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
    const allContactsText = await fs.readFile(contactsPath);
    const allContacts = JSON.parse(allContactsText);
    return allContacts || null;
};

const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const contactByID = allContacts.filter((item) => item.id === contactId);
    return contactByID || null;
};

const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    const contactByID = allContacts.filter((item) => item.id === contactId);
    if (!contactByID) {
        return null;
    }
    const newContacts = allContacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contactByID;
};

const addContact = async (body) => {
    if (!body) return null;
    const allContacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    allContacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return newContact;
};

const updateContact = async (contactId, body) => {
    const allContacts = await listContacts();
    let contactByID = null;
    const newContacts = allContacts.map((item) => {
        if (item.id === contactId) {
            item = { id: contactId, ...body };
            contactByID = item;
        }
        return item;
    });
    if (!contactByID) {
        return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contactByID;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
