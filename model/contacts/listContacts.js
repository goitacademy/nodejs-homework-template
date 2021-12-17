const fs = require("fs/promises");
const contactsPath = require("./filePath");

async function listContacts() {
    const fileData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(fileData);
    return contacts;
  }

module.exports = listContacts;