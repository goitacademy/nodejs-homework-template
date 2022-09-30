const listContacts = require('./listContacts');
const { v4: uuidv4 } = require('uuid');
const rewriteJson = require('./rewriteJson')


const addContact = async ({ name, email, phone }) => {
    const id = uuidv4();
    const newContact = {
        id,
        name,
        email,
        phone,
    };
    const contacts = await listContacts();
    contacts.push(newContact);
   await rewriteJson(contacts);
    return newContact;
};

module.exports = addContact;