const { nanoid } = require('nanoid');
const { overwritingContacts } = require('../helpers');
const listContacts = require('./listContacts');

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(5),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await overwritingContacts(contacts)
    return newContact;
};

module.exports = addContact;