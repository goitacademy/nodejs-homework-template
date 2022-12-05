const fs = require("fs/promises");
const dbContactsPath = require("./dbPath");

async function get() { 
  const contacts = await fs.readFile(dbContactsPath);
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
}

module.exports = get;