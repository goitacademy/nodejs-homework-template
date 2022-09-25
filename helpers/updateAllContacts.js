const fs = require('fs').promises;
const contactsPath = require('./contactsPath');

const updateAllContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
};

module.exports = updateAllContacts;