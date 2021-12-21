const shortid = require("shortid");

const listContacts = require("./listContacts");
const updateContactsList = require("./updateContactsList");

const addContact = async ({ name, email, phone }) => {
    const newContact = {
        id: shortid.generate(),
        name,
        email,
        phone
    };
    const contacts = await listContacts();
    contacts.push(newContact);
    await updateContactsList(contacts);
    // console.table(contacts);
    return newContact;
};

module.exports = addContact;