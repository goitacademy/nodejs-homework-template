const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = require("./listContacts");

async function removeContact(id) {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(el => el.id === id.toString());
    const newContacts = contacts.filter(el => el.id !== id.toString());
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contactToRemove;
}

module.exports = removeContact;