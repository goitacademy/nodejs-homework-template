const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
    const allContacts = await fs.readFile(contactsPath, (err, data) => {
        if (err) throw err;
        return data;
    });
    return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
    const allContacts = await listContacts();
    const contactById = allContacts.find(
        (item) => String(item.id) === contactId
    );
    return contactById;
};

const addContact = async (body) => {
    const allContacts = await listContacts();
    const newContact = { id: v4(), ...body };
    const newContactsArr = [...allContacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsArr), (err) => {
        if (err) throw err;
    });
    return newContact;
};

const removeContact = async (contactId) => {
    const allContacts = await listContacts();
    const removeContact = allContacts.find(
        (item) => String(item.id) === contactId
    );
    const newAllContacts = await allContacts.filter(
        (item) => String(item.id) !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newAllContacts), (err) => {
        if (err) throw err;
    });
    return removeContact;
};

const updateContact = async (contactId, body) => {
    const allContacts = await listContacts();
    const contact = allContacts.find((item) => String(item.id) === contactId);
    if (!contact) return;
    const updateContact = { ...contact, ...body };
    const updateAllContacts = allContacts.map((item) =>
        String(item.id) === contactId ? updateContact : item
    );
    await fs.writeFile(
        contactsPath,
        JSON.stringify(updateAllContacts),
        (err) => {
            if (err) throw err;
        }
    );
    return updateContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
