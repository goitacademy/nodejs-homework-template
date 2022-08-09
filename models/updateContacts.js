const fs = require("fs").promises;
const contactsPath = require("./contactsPath");

async function updateContacts(newContacts) {
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
}
module.exports = updateContacts;
