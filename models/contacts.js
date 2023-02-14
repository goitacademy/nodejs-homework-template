const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "./contacts.json");

const updateFile = async (contacts) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(contacts));
    } catch (error) {
        console.error(error.message);
    }
};

const listContacts = async () => {
    try {
        const contactsList = await fs.readFile(filePath);
        return JSON.parse(contactsList);
    } catch (error) {
        console.error(error.message);
    }
};

const getContactById = async (contactId) => {
    try {
        const contactsList = await listContacts();
        const contact = contactsList.find((item) => item.id === contactId);

        if (!contact) {
            return null;
        }

        return contact;
    } catch (error) {
        console.error(error.message);
    }
};

const removeContact = async (contactId) => {
    try {
        const contactsList = await listContacts();
        const index = contactsList.findIndex((item) => item.id === contactId);

        if (index === -1) {
            return null;
        }

        const [removeContact] = contactsList.splice(index, 1);
        await updateFile(contactsList);
        return removeContact;
    } catch (error) {
        console.error(error.message);
    }
};

const addContact = async (body) => {
    try {
        const newContact = { id: uuidv4(), ...body };
        const contactsList = await listContacts();

        contactsList.push(newContact);
        await updateFile(contactsList);
        return newContact;
    } catch (error) {
        console.error(error.message);
    }
};

const updateContact = async (contactId, body) => {
    try {
        const contactsList = await listContacts();
        const index = contactsList.findIndex((item) => item.id === contactId);

        if (index === -1) {
            return null;
        }

        contactsList[index].name = body.name;
        contactsList[index].email = body.email;
        contactsList[index].phone = body.phone;

        const updatedContact = { contactId, ...body };

        await updateFile(contactsList);
        return updatedContact;
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
