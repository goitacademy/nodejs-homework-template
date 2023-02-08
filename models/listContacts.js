const fs = require('fs/promises');
const filePath = require('./filePath');

const listContacts = async () => {
    const data = await fs.readFile(filePath);
    const contactsList = JSON.parse(data);
    return contactsList;
}

module.exports = listContacts;