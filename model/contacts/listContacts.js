const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
}

module.exports = listContacts;