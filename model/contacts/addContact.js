const { v4 } = require("uuid");

const listContacts = require("./listContacts");
const updateContactsList = require("./updateContactsList");

const addContact = async (body) => {
    try {
        const newContact = { ...body, id: v4() };
        const contacts = await listContacts();
        products.push(newContact);
        await updateContactsList(contacts);
        return newContact;
    }
    catch (error) {
        throw error;
    }
};

module.exports = addContact;