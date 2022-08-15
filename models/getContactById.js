const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);
    return result || null;
};

module.exports = getContactById;