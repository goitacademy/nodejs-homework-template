const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

async function updateContacts (contacts) {
    const contactString = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, contactString);
}

module.exports = updateContacts;