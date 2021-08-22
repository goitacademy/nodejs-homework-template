const fs = require("fs/promises");
const contactsPath = require("./contactsPath");

async function update (newContacts) {
    const contactString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, contactString);
}

module.exports = update;