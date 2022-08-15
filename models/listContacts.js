const { contactsPath } = require('../helpers');
const fs = require('fs').promises;


const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

module.exports = listContacts;