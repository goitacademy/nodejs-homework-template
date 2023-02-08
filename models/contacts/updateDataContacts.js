const fs = require("fs").promises;
const path = require("path");

const pathFileContacts = path.join(__dirname, "./dataContacts.json");

async function updateDataContacts(newDataContacts) {
  await fs.writeFile(pathFileContacts, JSON.stringify(newDataContacts));
}

module.exports = updateDataContacts;
