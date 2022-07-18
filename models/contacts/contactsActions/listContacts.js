const fs = require('fs/promises');
const contactsPath = require('../contactsDB');
const { resourceLimits } = require('worker_threads');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8');
    if (!data) {
        return null;
    }
    const result = JSON.parse(data);
    return result;
}

module.exports = listContacts;