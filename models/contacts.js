const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "./contacts.json");

const updateFile = async (filePath, contacts) => {
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
    const contactsList = await fs.readFile(filePath);
    return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
    const contactsList = await listContacts();
    const contact = contactsList.find((item) => item.id === contactId);

    if (!contact) {
        return null;
    }

    return contact;
};

const removeContact = async (contactId) => {
    const contactsList = await listContacts();
    const index = contactsList.findIndex((item) => item.id === contactId);

    if (index === -1) {
        return null;
    }

    const [removeContact] = contactsList.splice(index, 1);
    await updateFile(contactsList);
    return removeContact;
};

const addContact = async (body) => {
    const newContact = { id: uuidv4(), ...body };
    const contactsList = await listContacts();
    contactsList.push(newContact);
    await updateFile(filePath, contactsList);
    return newContact;
};

const updateContact = async (contactId, body) => {
    const contactsList = await listContacts();
    const index = contactsList.findIndex((item) => item.id === contactId);

    if (index === -1) {
        return null;
    }

    contactsList[index].name = body.name;
    contactsList[index].email = body.email;
    contactsList[index].phone = body.phone;
    const updatedContact = { contactId, ...body };
    await updateFile(filePath, contactsList);
    return updatedContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
