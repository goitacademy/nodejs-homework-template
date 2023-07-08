// actions.js

const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

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

const removeContact = async (contactId) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);
        const index = contacts.findIndex((c) => c.id === contactId);

        if (index === -1) {
            // Контакт із зазначеним id не знайдено
            return null;
        }

        const [removedContact] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return removedContact;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

/**
 * Додає новий контакт.
 *
 * @param {string} name - Ім'я контакту.
 * @param {string} email - Email контакту.
 * @param {string} phone - Телефон контакту.
 * @returns {Promise<Object>} Об'єкт доданого контакту.
 */
const addContact = async ({ name, email, phone }) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);

        const newContact = {
            id: uuidv4(),
            name,
            email,
            phone,
        };

        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

        return newContact;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

const updateContact = async (contactId, body) => {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        const contacts = JSON.parse(data);

        const updatedContacts = contacts.map((contact) => {
            if (contact.id === contactId) {
                return { ...contact, ...body };
            }
            return contact;
        });

        await fs.writeFile(
            contactsPath,
            JSON.stringify(updatedContacts, null, 2)
        );

        return updatedContacts.find((contact) => contact.id === contactId);
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
