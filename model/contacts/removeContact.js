
const listContacts = require("./listContacts")
const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "../contacts.json");


async function removeContact(id) {
    const contacts = await listContacts();
    const contactToRemove = contacts.find((el) => el.id === id);
    const contactsWithoutRemoved = contacts.filter((el) => el.id !== id);
    if (!contactsWithoutRemoved) {
      return null;
    }
    await fs.writeFile(contactsPath, JSON.stringify(contactsWithoutRemoved));
    return contactToRemove;
  }

  module.exports = removeContact