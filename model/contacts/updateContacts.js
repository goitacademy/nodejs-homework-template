const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, './contacts.json');

const updateContacts = async(newContacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

module.exports = updateContacts;