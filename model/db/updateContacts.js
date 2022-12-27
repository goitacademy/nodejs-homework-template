const contactsPath = require("./filePath");
const fs = require("fs/promises");

const updateContacts = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = updateContacts;