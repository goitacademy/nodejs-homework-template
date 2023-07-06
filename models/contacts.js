const fs = require("fs").promises;
const uuid = require("uuid");

const contactsPath = "./models/contacts.json";

/**
 * Повертає список контактів.
 *
 * @returns {Promise<Array>} Массив контактов.
 */
const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};
const getContactById = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const contact = contacts.find((c) => c.id === contactId);
        return contact || null;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
