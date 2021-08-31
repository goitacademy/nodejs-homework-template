const {v4 } = require("uuid");

const listContacts = require("./listContacts");
const update = require("./update");

const addContact = async (body) => {
    try {
        const newContact = {...body, id: v4()}
        const contacts = await listContacts();
        contacts.push(newContact);
        await update(contacts);
        return newContact;
    }
    catch (error) {
        throw error
    }
}

module.exports = addContact;