const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function updateContacts (newContacts) {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
};

module.exports = updateContacts;